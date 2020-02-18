import { Message } from "./chatRooms";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const GET_MESSAGES_START = "GET_MESSAGES_START";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE";

export interface GetMessagesStartAction {
  type: typeof GET_MESSAGES_START;
  roomId: string;
}

export interface GetMessagesSuccessAction {
  type: typeof GET_MESSAGES_SUCCESS;
  messages: Message[];
  roomId: string;
}

export interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  message: Message;
  roomId: string;
}

export interface UpdateMessageAction {
  type: typeof UPDATE_MESSAGE;
  message: Partial<Message>;
  roomId: string;
}

export interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  id: string;
  roomId: string;
}

export type ChatMessagesActionTypes =
  | GetMessagesStartAction
  | GetMessagesSuccessAction
  | AddMessageAction
  | UpdateMessageAction
  | DeleteMessageAction;

const getMessagesStart = (roomId: string): ChatMessagesActionTypes => ({
  type: GET_MESSAGES_START,
  roomId
});

const getMessagesSuccess = (
  messages: Message[],
  roomId: string
): ChatMessagesActionTypes => ({
  type: GET_MESSAGES_SUCCESS,
  messages,
  roomId
});

const addMessage = (
  message: Message,
  roomId: string
): ChatMessagesActionTypes => ({
  type: ADD_MESSAGE,
  message,
  roomId
});

const updateMessage = (
  message: Partial<Message>,
  roomId: string
): ChatMessagesActionTypes => ({
  type: UPDATE_MESSAGE,
  message,
  roomId
});

const deleteMessage = (
  id: string,
  roomId: string
): ChatMessagesActionTypes => ({
  type: DELETE_MESSAGE,
  id,
  roomId
});

export const chatMessagesActions = {
  getMessagesStart,
  addMessage,
  updateMessage,
  deleteMessage,
  getMessagesSuccess
};
