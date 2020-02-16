import { put, take, cancelled, takeEvery } from "redux-saga/effects";
import { eventChannel } from "redux-saga";
import {
  GetMessagesStartAction,
  chatMessagesActions,
  GET_MESSAGES_START
} from "../actions/chatMessages";
import { chatMessagesApi } from "../firebase";
import { Message } from "../actions/chatRooms";

function* chatMessages(action: GetMessagesStartAction) {
  const channel = eventChannel(emit =>
    chatMessagesApi.getMessages(action.roomId).onSnapshot(messagesSnapshot => {
      messagesSnapshot.docChanges().forEach(change => {
        if (change.type === "added") {
          const message = change.doc.data() as Message;
          emit(chatMessagesActions.addMessage(message, action.roomId));
        }
        if (change.type === "modified") {
          const message = change.doc.data() as Message;
          emit(chatMessagesActions.updateMessage(message, action.roomId));
        }
        if (change.type === "removed") {
          // emit(chatMessagesActions.deleteMessage(change.doc.id));
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
    // channel.close();
    if (yield cancelled()) {
      console.log("The saga is cancelled");
    }
  } finally {
    if (yield cancelled()) {
      console.log("The saga is cancelled");
    }
    // channel.close();
  }
}

export function* watchChatMessages() {
  yield takeEvery(GET_MESSAGES_START, chatMessages);
}
