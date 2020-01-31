import { put, takeLatest, take } from "redux-saga/effects";
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
      messagesSnapshot.docChanges().forEach(function(change) {
        if (change.type === "added") {
          const message = change.doc.data() as Message;
          emit(chatMessagesActions.addMessage(message));
        }
        if (change.type === "modified") {
          const message = change.doc.data() as Message;
          emit(chatMessagesActions.updateMessage(message));
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
    channel.close();
  } finally {
    channel.close();
  }
}

export function* watchChatMessages() {
  yield takeLatest(GET_MESSAGES_START, chatMessages);
}
