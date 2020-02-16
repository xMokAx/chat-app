import { put, take, takeEvery, call } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  GetRoomsStartAction,
  GET_ROOMS_START,
  chatRoomsActions,
  Room,
  MY_ROOMS,
  GetRoomsByQueryStart,
  GET_ROOMS_BY_QUERY_START
} from "../actions/chatRooms";
import { chatRoomsApi } from "../firebase";

function* chatRooms(action: GetRoomsStartAction) {
  let roomsQuery =
    action.roomsType === MY_ROOMS
      ? chatRoomsApi.getMyRooms
      : chatRoomsApi.getRooms;
  const channel = eventChannel(emit =>
    roomsQuery().onSnapshot(roomsSnapshot => {
      if (roomsSnapshot.empty) {
        emit(
          chatRoomsActions.getRoomsFailure(
            "No rooms available.",
            action.roomsType
          )
        );
      }
      roomsSnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          const room = change.doc.data() as Room;
          if (room.createdAt) {
            emit(chatRoomsActions.addRoom(room, action.roomsType));
          }
        }
        if (change.type === "modified") {
          const room = change.doc.data() as Room;
          if (!room.lastMessage) {
            emit(chatRoomsActions.addRoom(room, action.roomsType));
          } else {
            emit(chatRoomsActions.updateRoom(room, action.roomsType));
          }
        }
        if (change.type === "removed") {
          emit(chatRoomsActions.deleteRoom(change.doc.id, action.roomsType));
        }
      });
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
  try {
    const roomsSnapshot: firebase.firestore.QuerySnapshot = yield call(
      chatRoomsApi.getRoomsByQuery,
      action.query
    );

    if (roomsSnapshot.empty) {
      if (roomsSnapshot.metadata.fromCache) {
        throw new Error(
          "Can't search for rooms, please check your connection."
        );
      }
      console.log(roomsSnapshot.metadata);
      throw new Error("No rooms found.");
    }
    const rooms: Room[] = [];
    roomsSnapshot.forEach(doc => {
      rooms.push(doc.data() as Room);
    });
    yield put(chatRoomsActions.getRoomsSuccess(rooms, action.roomsType));
  } catch (error) {
    yield put(
      chatRoomsActions.getRoomsFailure(error.message, action.roomsType)
    );
  }
}

export function* watchChatRoomsByQuery() {
  yield takeEvery(GET_ROOMS_BY_QUERY_START, chatRoomsByQuery);
}
