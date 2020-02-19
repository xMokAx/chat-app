import { put, take, takeEvery, select } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import { peopleActions, Person } from "../actions/people";
import { SetActiveRoomAction, SET_ACTIVE_ROOM } from "../actions/chatRooms";
import { users } from "../firebase";
import { AppState } from "../store/configureStore";

function* activeRoomPeople(action: SetActiveRoomAction) {
  const exist: Person[] | undefined = yield select(
    (state: AppState) => state.people[action.id]
  );
  if (exist) {
    return;
  }
  const channel = eventChannel(emit =>
    users
      .where("joinedRooms", "array-contains", action.id)
      .onSnapshot(peopleSnapshot => {
        peopleSnapshot.docChanges().forEach(function(change) {
          if (change.type === "added") {
            const { id, name, photo } = change.doc.data() as Person;
            emit(peopleActions.addPerson({ id, name, photo }, action.id));
          }
          if (change.type === "modified") {
            const { id, name, photo } = change.doc.data() as Person;
            emit(peopleActions.updatePerson({ id, name, photo }, action.id));
          }
          if (change.type === "removed") {
            emit(peopleActions.deletePerson(change.doc.id, action.id));
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
  yield takeEvery(SET_ACTIVE_ROOM, activeRoomPeople);
}
