import { Message } from "../actions/chatRooms";
import {
  ChatMessagesActionTypes,
  ADD_MESSAGE,
  GET_MESSAGES_START,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  GET_MESSAGES_SUCCESS
} from "../actions/chatMessages";
import { AppState } from "../store/configureStore";

export interface RoomMessagesState {
  isLoading: boolean;
  error: string;
  messages: Message[];
}

const initialRoomMessagesState: RoomMessagesState = {
  isLoading: false,
  error: "",
  messages: []
};

export type ChatMessagesState = {
  [key: string]: RoomMessagesState;
};

const initialChatMessagesState: ChatMessagesState = {};

const chatMessages = (
  state = initialRoomMessagesState,
  action: ChatMessagesActionTypes
): RoomMessagesState => {
  switch (action.type) {
    case GET_MESSAGES_START:
      return {
        ...initialRoomMessagesState,
        isLoading: true
      };
    case GET_MESSAGES_SUCCESS:
      return {
        ...state,
        messages: [...action.messages, ...state.messages]
      };
    case ADD_MESSAGE:
      return {
        ...state,
        isLoading: false,
        error: "",
        messages: [...state.messages, action.message]
      };
    case UPDATE_MESSAGE:
      return {
        ...state,
        messages: state.messages.map(m => {
          if (m.id === action.message.id) {
            return {
              ...m,
              ...action.message
            };
          } else {
            return m;
          }
        })
      };
    case DELETE_MESSAGE:
      return {
        ...state,
        messages: state.messages.filter(m => m.id !== action.id)
      };
    default:
      return state;
  }
};

export const chatMessagesByRoomReducer = (
  state = initialChatMessagesState,
  action: ChatMessagesActionTypes
): ChatMessagesState => {
  switch (action.type) {
    case GET_MESSAGES_START:
    case GET_MESSAGES_SUCCESS:
    case ADD_MESSAGE:
    case UPDATE_MESSAGE:
    case DELETE_MESSAGE:
      return {
        ...state,
        [action.roomId]: chatMessages(state[action.roomId], action)
      };
    default:
      return state;
  }
};

export const getRoomMessagesState = (state: AppState) => {
  const { chatRooms, chatMessages } = state;
  return {
    isLoading: chatMessages[chatRooms.activeRoomId]
      ? chatMessages[chatRooms.activeRoomId].isLoading
      : true,
    error: chatMessages[chatRooms.activeRoomId]
      ? chatMessages[chatRooms.activeRoomId].error
      : ""
  };
};

export const getSortedMessages = (state: AppState) => {
  if (state.chatMessages[state.chatRooms.activeRoomId]) {
    return state.chatMessages[state.chatRooms.activeRoomId].messages.sort(
      (a, b) => {
        if (a.createdAt && b.createdAt) {
          if (a.createdAt.seconds - b.createdAt.seconds !== 0) {
            return a.createdAt.seconds - b.createdAt.seconds;
          } else {
            return a.createdAt.nanoseconds - b.createdAt.nanoseconds;
          }
        } else {
          return 0;
        }
      }
    );
  } else {
    return [];
  }
};
