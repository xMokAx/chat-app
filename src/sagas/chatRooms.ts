import { put, takeLatest, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  GetRoomsStartAction,
  GET_ROOMS_START,
  chatRoomsActions,
  Room
} from "../actions/chatRooms";
import { chatRoomsApi } from "../firebase";

function* chatRooms(action: GetRoomsStartAction) {
  const channel = eventChannel(emit =>
    chatRoomsApi.getRooms().onSnapshot(roomsSnapshot => {
      if (roomsSnapshot.empty) {
        emit(chatRoomsActions.getRoomsFailure("No rooms available."));
      }
      roomsSnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          const room = change.doc.data() as Room;
          if (room.createdAt) {
            emit(chatRoomsActions.addRoom(room));
          }
        }
        if (change.type === "modified") {
          const room = change.doc.data() as Room;
          if (!room.lastMessage) {
            emit(chatRoomsActions.addRoom(room));
          } else {
            emit(chatRoomsActions.updateRoom(room));
          }
        }
        if (change.type === "removed") {
          emit(chatRoomsActions.deleteRoom(change.doc.id));
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
  yield takeLatest(GET_ROOMS_START, chatRooms);
}
