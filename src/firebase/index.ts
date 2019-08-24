import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { User } from "../actions/user";

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appID: process.env.REACT_APP_APP_ID
};
console.log(config);
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
  signUpEmail: (email: string, password: string) =>
    auth.createUserWithEmailAndPassword(email, password),
  signInEmail: (email: string, password: string) =>
    auth.signInWithEmailAndPassword(email, password),
  signInWithProvider: (name: string) =>
    auth.signInWithPopup(authProviders[name]),
  signOut: () => auth.signOut(),
  resetPassword: (email: string) => auth.sendPasswordResetEmail(email),
  updatePassword: (password: string) => {
    if (auth.currentUser) {
      return auth.currentUser.updatePassword(password);
    }
  },
  getSignInMethods: (email: string) => {
    return auth.fetchSignInMethodsForEmail(email);
  },
  linkProvider: (name: string) => {
    if (auth.currentUser) {
      return auth.currentUser.linkWithPopup(authProviders[name]);
    }
  },
  linkEmail: (password: string) => {
    const { currentUser } = auth;
    if (currentUser) {
      let credential;
      if (currentUser.email) {
        credential = firebase.auth.EmailAuthProvider.credential(
          currentUser.email,
          password
        );
      }
      if (credential) {
        return currentUser.linkWithCredential(credential);
      }
    }
  },
  unlinkProvider: (providerId: string) => {
    if (auth.currentUser) {
      return auth.currentUser.unlink(providerId);
    }
  }
};

const firestore = firebase.firestore;
const database = firestore();
const users = database.collection("users");
const userApi = {
  addUser: (id: string, user: User) => users.doc(id).set(user, { merge: true }),
  updateUser: (id: string, user: User) =>
    users.doc(id).set(user, { merge: true }),
  deleteUser: (id: string) => users.doc(id).delete(),
  getUser: (id: string) => users.doc(id).get()
};

export { authApi, auth, userApi };
