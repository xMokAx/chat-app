import {
  put,
  take,
  takeEvery,
  select,
  takeLatest,
  cancelled
} from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import * as firebase from "firebase/app";
import {
  GetRoomsStartAction,
  GET_ROOMS_START,
  chatRoomsActions,
  Room,
  MY_ROOMS,
  GetRoomsByQueryStart,
  GET_ROOMS_BY_QUERY_START
} from "../actions/chatRooms";
import { chatRoomsApi, userApi } from "../firebase";
import { AppState } from "../store/configureStore";

function* chatRooms(action: GetRoomsStartAction) {
  const roomsType = action.roomsType;
  const isMyRooms = roomsType === MY_ROOMS;
  let isInitialDocs = true;
  let roomsQuery = isMyRooms ? chatRoomsApi.getMyRooms : chatRoomsApi.getRooms;

  const userId = yield select((state: AppState) => state.user.userInfo.id);
  const channel = eventChannel(emit =>
    roomsQuery().onSnapshot(roomsSnapshot => {
      if (roomsSnapshot.empty) {
        isInitialDocs = false;

        if (roomsSnapshot.metadata.fromCache) {
          emit(
            chatRoomsActions.getRoomsFailure(
              "Please, fix your connection. Retrying...",
              roomsType
            )
          );
        } else {
          let error = isMyRooms
            ? "You didn't join any rooms."
            : "No rooms available. Create a room and start chatting.";
          emit(chatRoomsActions.getRoomsFailure(error, roomsType));
        }
      }
      let rooms: Room[] = [];
      roomsSnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          const room = change.doc.data() as Room;
          if (room.createdAt && isInitialDocs) {
            rooms.unshift(room);
          } else {
            emit(chatRoomsActions.addRoom(room, roomsType));
          }
        }
        if (change.type === "modified") {
          const room = change.doc.data() as Room;
          emit(chatRoomsActions.updateRoom(room, roomsType));
        }
        if (change.type === "removed") {
          emit(chatRoomsActions.deleteRoom(change.doc.id, roomsType));
          if (isMyRooms) {
            userApi.updateUser(userId, {
              joinedRooms: (firebase.firestore.FieldValue.arrayRemove(
                change.doc.id
              ) as unknown) as string[]
            });
          }
        }
      });

      if (isInitialDocs) {
        emit(chatRoomsActions.getRoomsSuccess(rooms, roomsType));
        isInitialDocs = false;
      }
    })
  );

  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (err) {
    // yield put(errorAction(err))
  }
}

export function* watchChatRooms() {
  yield takeEvery(GET_ROOMS_START, chatRooms);
}

function* chatRoomsByQuery(action: GetRoomsByQueryStart) {
  const roomsType = action.roomsType;
  let isInitialDocs = true;
  const channel = eventChannel(emit =>
    chatRoomsApi.getRoomsByQuery(action.query).onSnapshot(roomsSnapshot => {
      if (roomsSnapshot.empty) {
        if (roomsSnapshot.metadata.fromCache) {
          emit(
            chatRoomsActions.getRoomsFailure(
              "Please, fix your connection. Retrying...",
              roomsType
            )
          );
        } else {
          emit(
            chatRoomsActions.getRoomsFailure("No rooms available.", roomsType)
          );
        }
      }
      let rooms: Room[] = [];
      roomsSnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          const room = change.doc.data() as Room;
          if (room.createdAt && isInitialDocs) {
            rooms.unshift(room);
          } else {
            emit(chatRoomsActions.addRoom(room, roomsType));
          }
        }
        if (change.type === "modified") {
          const room = change.doc.data() as Room;
          emit(chatRoomsActions.updateRoom(room, roomsType));
        }
        if (change.type === "removed") {
          emit(chatRoomsActions.deleteRoom(change.doc.id, roomsType));
        }
      });

      if (isInitialDocs) {
        emit(chatRoomsActions.getRoomsSuccess(rooms, roomsType));
        isInitialDocs = false;
      }
    })
  );

  try {
    while (true) {
      const action = yield take(channel);
      yield put(action);
    }
  } catch (err) {
    // yield put(errorAction(err))
    if (yield cancelled()) {
      console.log("rooms query saga is cancelled from catch");
      channel.close();
    }
  } finally {
    if (yield cancelled()) {
      console.log("rooms query saga is cancelled from finally");
      channel.close();
    }
  }
}

export function* watchChatRoomsByQuery() {
  yield takeLatest(GET_ROOMS_BY_QUERY_START, chatRoomsByQuery);
}
