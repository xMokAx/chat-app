import * as firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import "firebase/storage";
import { User, userActions } from "../actions/user";
import { Room, Message } from "../actions/chatRooms";
import { store } from "..";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appID: process.env.REACT_APP_APP_ID
};

firebase.initializeApp(config);

const auth = firebase.auth();

const emailProvider = new firebase.auth.EmailAuthProvider();
const googleProvider = new firebase.auth.GoogleAuthProvider();
const facebookProvider = new firebase.auth.FacebookAuthProvider();
const githubProvider = new firebase.auth.GithubAuthProvider();

interface AuthProviders {
  [key: string]:
    | typeof emailProvider
    | typeof googleProvider
    | typeof facebookProvider
    | typeof githubProvider;
}

export const authProviders: AuthProviders = {
  password: emailProvider,
  google: googleProvider,
  facebook: facebookProvider,
  github: githubProvider
};

const authApi = {
  currentUser: () => auth.currentUser!!,
  signUpEmail: (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password),
  signInEmail: (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password),
  signInWithProvider: (name: string) =>
    auth.signInWithPopup(authProviders[name]),
  signOut: () => auth.signOut(),
  resetPassword: (email: string) => auth.sendPasswordResetEmail(email),
  updatePassword: (password: string) => {
    return auth.currentUser!!.updatePassword(password);
  },
  getSignInMethods: (email: string) => {
    return auth.fetchSignInMethodsForEmail(email);
  },
  linkProvider: (name: string) => {
    return auth.currentUser!!.linkWithPopup(authProviders[name]);
  },
  linkEmail: (password: string) => {
    if (auth.currentUser) {
      const credential = firebase.auth.EmailAuthProvider.credential(
        auth.currentUser.email!!,
        password
      );
      return auth.currentUser.linkWithCredential(credential);
    }
  },
  unlinkProvider: (providerId: string) => {
    return auth.currentUser!!.unlink(providerId);
  }
};

const fStore = firebase.firestore;
const database = fStore();
export const users = database.collection("users");

// Get a reference to the storage service, which is used to create references in your storage bucket
const storage = firebase.storage();
// Create a storage reference from our storage service
const storageRef = storage.ref();
// Create a child reference
const imagesRef = storageRef.child("images");
// imagesRef now points to 'images'

const userApi = {
  addUser: (id: string, user: User) => users.doc(id).set(user, { merge: true }),
  updateUser: (id: string, user: Partial<User>) => users.doc(id).update(user),
  deleteUser: (id: string) => users.doc(id).delete(),
  getUser: (id: string) => users.doc(id).get(),
  uploadImage: (imageName: string, image: Blob) =>
    imagesRef.child(imageName).put(image)
};

const chatRooms = database.collection("chatRooms");
const getRoomRef = (roomId: string) => chatRooms.doc(roomId);

const chatRoomsApi = {
  addRoom: async (room: Pick<Room, "name" | "desc">) => {
    const roomRef = chatRooms.doc();
    const roomId = roomRef.id;
    const {
      id,
      name,
      createdRooms,
      joinedRooms
    } = store.getState().user.userInfo;
    await roomRef.set({
      id: roomRef.id,
      people: firebase.firestore.FieldValue.arrayUnion(id),
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      messagesCount: 0,
      ...room
    });

    await chatMessagesApi.addMessage(roomRef.id, {
      text: `${name} created this room.`,
      senderId: "system"
    });

    await chatMessagesApi.addMessage(roomRef.id, {
      text: `${name} Joined this room.`,
      senderId: "system"
    });

    await userApi.updateUser(id, {
      createdRooms: (firebase.firestore.FieldValue.arrayUnion(
        roomId
      ) as unknown) as string[],
      joinedRooms: (firebase.firestore.FieldValue.arrayUnion(
        roomId
      ) as unknown) as string[]
    });
    store.dispatch(
      userActions.updateUser({
        createdRooms: [roomId, ...createdRooms!!],
        joinedRooms: [roomId, ...joinedRooms!!]
      })
    );

    return Promise.resolve(roomId);
  },
  updateRoom: async (id: string, room: Partial<Room>) =>
    chatRooms.doc(id).update(room),
  getRoom: (id: string) => chatRooms.doc(id).get(),
  // { source: "server" } to throw error when offline instead of using cache
  getRooms: () => chatRooms.orderBy("createdAt")
};

const chatMessagesApi = {
  getMessages: (roomId: string) =>
    getRoomRef(roomId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .limit(20),
  getMoreMessages: (
    roomId: string,
    beforeCreatedAt: firebase.firestore.Timestamp
  ) => {
    return getRoomRef(roomId)
      .collection("messages")
      .orderBy("createdAt", "desc")
      .startAfter(beforeCreatedAt)
      .limit(20);
  },
  addMessage: async (
    roomId: string,
    message: Pick<Message, "text" | "senderId">
  ) => {
    const messageRef = getRoomRef(roomId)
      .collection("messages")
      .doc();
    await messageRef.set({
      id: messageRef.id,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      ...message
    });
    return Promise.resolve(messageRef);
  },
  deleteMessage: (roomId: string, messageId: string) =>
    getRoomRef(roomId)
      .collection("messages")
      .doc(messageId)
};

export { authApi, auth, userApi, chatRoomsApi, chatMessagesApi };
