import * as functions from "firebase-functions";
import * as firebase from "firebase-admin";
import { deleteCollection } from "./utils";

// // Start writing Firebase Functions
// // https://firebase.google.com/docs/functions/typescript

firebase.initializeApp();

const firestore = firebase.firestore;
const database = firestore();

export const lastMessage = functions
  .region("europe-west1")
  .firestore.document("chatRooms/{roomId}/messages/{messageId}")
  .onCreate(async (snap, context) => {
    const { messageId, roomId } = context.params;
    console.log(`New message ${messageId} in room ${roomId}`);
    const lastMessage = snap.data();
    if (snap.ref.parent.parent) {
      await snap.ref.parent.parent.update({
        messagesCount: firestore.FieldValue.increment(1),
        lastMessage
      });
    }
  });

interface Room {
  id: string;
  name: string;
  desc: string;
  messagesCount: number;
  creator: {
    id: string;
    name: string;
    photo: string | null;
  };
  people: string[];
}

export const onRoomCreation = functions
  .region("europe-west1")
  .firestore.document("chatRooms/{roomId}")
  .onCreate(async (snap, context) => {
    const { roomId } = context.params;
    console.log(`New Room ${roomId} was created`);
    const creator = (snap.data() as Room).creator;
    const creationMessageRef = snap.ref.collection("messages").doc();
    await creationMessageRef.set({
      id: creationMessageRef.id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      text: `${creator.name} created this room.`,
      senderId: "system"
    });
    const joiningMessageRef = snap.ref.collection("messages").doc();
    await joiningMessageRef.set({
      id: joiningMessageRef.id,
      createdAt: firestore.FieldValue.serverTimestamp(),
      text: `${creator.name} Joined this room.`,
      senderId: "system"
    });

    await database
      .collection("users")
      .doc(creator.id)
      .update({
        createdRooms: (firestore.FieldValue.arrayUnion(
          roomId
        ) as unknown) as string[],
        joinedRooms: (firestore.FieldValue.arrayUnion(
          roomId
        ) as unknown) as string[]
      });
  });

export const onRoomDeletion = functions
  .region("europe-west1")
  .firestore.document("chatRooms/{roomId}")
  .onDelete(async (snap, context) => {
    const { roomId } = context.params;
    console.log(`Room ${roomId} was deleted`);
    const creator = (snap.data() as Room).creator;

    await database
      .collection("users")
      .doc(creator.id)
      .update({
        createdRooms: (firestore.FieldValue.arrayRemove(
          roomId
        ) as unknown) as string[],
        joinedRooms: (firestore.FieldValue.arrayRemove(
          roomId
        ) as unknown) as string[]
      });

    await deleteCollection(
      database,
      `${snap.ref.path}/messages`,
      "createdAt",
      500
    );
  });
