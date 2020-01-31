import { put, takeLatest, take } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  SetActiveRoomAction,
  SET_ACTIVE_ROOM,
  activeRoomActions,
  Person
} from "../actions/activeRoom";
import { users } from "../firebase";

function* activeRoomPeople(action: SetActiveRoomAction) {
  const channel = eventChannel(emit =>
    users
      .where("joinedRooms", "array-contains", action.id)
      .onSnapshot(peopleSnapshot => {
        peopleSnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            const { id, name, photo } = change.doc.data() as Person;
            emit(activeRoomActions.addPerson({ id, name, photo }));
          }
          if (change.type === "modified") {
            const { id, name, photo } = change.doc.data() as Person;
            emit(activeRoomActions.updatePerson({ id, name, photo }));
          }
          if (change.type === "removed") {
            emit(activeRoomActions.deletePerson(change.doc.id));
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

export function* watchActiveRoomPeople() {
  yield takeLatest(SET_ACTIVE_ROOM, activeRoomPeople);
}
