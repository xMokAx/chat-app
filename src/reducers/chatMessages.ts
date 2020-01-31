import { Message } from "../actions/chatRooms";
import {
  ChatMessagesActionTypes,
  ADD_MESSAGE,
  GET_MESSAGES_START,
  UPDATE_MESSAGE,
  DELETE_MESSAGE,
  ADD_MESSAGES
} from "../actions/chatMessages";

export type ChatMessagesState = {
  isLoading: boolean;
  error: string;
  messages: Message[];
};

const initialChatMessagesState: ChatMessagesState = {
  isLoading: false,
  error: "",
  messages: []
};

export const chatMessagesReducer = (
  state = initialChatMessagesState,
  action: ChatMessagesActionTypes
): ChatMessagesState => {
  switch (action.type) {
    case GET_MESSAGES_START:
      return {
        ...initialChatMessagesState,
        isLoading: true
      };
    case ADD_MESSAGES:
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

export const getSortedMessages = (state: ChatMessagesState) =>
  state.messages.sort((a, b) => {
    if (a.createdAt && b.createdAt) {
      if (a.createdAt.seconds - b.createdAt.seconds !== 0) {
        return a.createdAt.seconds - b.createdAt.seconds;
      } else {
        return a.createdAt.nanoseconds - b.createdAt.nanoseconds;
      }
    } else {
      return 0;
    }
  });
