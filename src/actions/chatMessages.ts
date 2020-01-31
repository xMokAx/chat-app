import { Message } from "./chatRooms";

export const ADD_MESSAGE = "ADD_MESSAGE";
export const UPDATE_MESSAGE = "UPDATE_MESSAGE";
export const DELETE_MESSAGE = "DELETE_MESSAGE";
export const ADD_MESSAGES = "ADD_MESSAGES";
export const GET_MESSAGES_START = "GET_MESSAGES_START";
export const GET_MESSAGES_SUCCESS = "GET_MESSAGES_SUCCESS";
export const GET_MESSAGES_FAILURE = "GET_MESSAGES_FAILURE";

export interface GetMessagesStartAction {
  type: typeof GET_MESSAGES_START;
  roomId: string;
}

export interface AddMessagesAction {
  type: typeof ADD_MESSAGES;
  messages: Message[];
}

export interface AddMessageAction {
  type: typeof ADD_MESSAGE;
  message: Message;
}

export interface UpdateMessageAction {
  type: typeof UPDATE_MESSAGE;
  message: Partial<Message>;
}

export interface DeleteMessageAction {
  type: typeof DELETE_MESSAGE;
  id: string;
}

export type ChatMessagesActionTypes =
  | GetMessagesStartAction
  | AddMessagesAction
  | AddMessageAction
  | UpdateMessageAction
  | DeleteMessageAction;

const getMessagesStart = (roomId: string): ChatMessagesActionTypes => ({
  type: GET_MESSAGES_START,
  roomId
});

const addMessages = (messages: Message[]): ChatMessagesActionTypes => ({
  type: ADD_MESSAGES,
  messages
});

const addMessage = (message: Message): ChatMessagesActionTypes => ({
  type: ADD_MESSAGE,
  message
});

const updateMessage = (message: Partial<Message>): ChatMessagesActionTypes => ({
  type: UPDATE_MESSAGE,
  message
});

const deleteMessage = (id: string): ChatMessagesActionTypes => ({
  type: DELETE_MESSAGE,
  id
});

export const chatMessagesActions = {
  getMessagesStart,
  addMessage,
  updateMessage,
  deleteMessage,
  addMessages
};
