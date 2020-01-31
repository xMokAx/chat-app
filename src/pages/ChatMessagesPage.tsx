import React, { useEffect, useRef } from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import * as firebase from "firebase/app";
import { AppState } from "../store/configureStore";
import { chatMessagesActions } from "../actions/chatMessages";
import { ChatMessagesState, getSortedMessages } from "../reducers/chatMessages";
import { useParams } from "react-router";
import { userApi, chatMessagesApi, chatRoomsApi } from "../firebase";
import { userActions } from "../actions/user";
import { getActiveRoom } from "../reducers/activeRoom";
import { activeRoomActions } from "../actions/activeRoom";
import { Room } from "../actions/chatRooms";
import ChatMessageInput from "../components/ChatMessageInput";
import Wrapper from "../styled/Wrapper";
import ChatMessagesDisplay from "../components/ChatMessagesDisplay";
import Error from "../styled/Error";
import Loading from "../styled/Loading";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

type Props = ChatMessagesState & {
  getMessagesStart: typeof chatMessagesActions.getMessagesStart;
  setActiveRoom: typeof activeRoomActions.setActiveRoom;
  updateUser: typeof userActions.updateUser;
  addMessages: typeof chatMessagesActions.addMessages;
  activeRoomId: string;
  userId: string;
  userName: string;
  joinedRooms: string[];
  activeRoom?: Room;
};

const ChatMessagesPage = ({
  isLoading,
  error,
  messages,
  getMessagesStart,
  activeRoomId,
  userId,
  userName,
  setActiveRoom,
  joinedRooms,
  updateUser,
  addMessages,
  activeRoom
}: Props) => {
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const { id } = useParams();
  useEffect(() => {
    if (id && id !== activeRoomId) {
      setActiveRoom(id);
      getMessagesStart(id);
    }
  }, [activeRoomId, getMessagesStart, id, setActiveRoom]);

  useEffect(() => {
    if (activeRoomId) {
      if (!joinedRooms.includes(activeRoomId)) {
        chatRoomsApi.updateRoom(activeRoomId, {
          people: (firebase.firestore.FieldValue.arrayUnion(
            userId
          ) as unknown) as string[]
        });
        userApi
          .updateUser(userId, {
            joinedRooms: (firebase.firestore.FieldValue.arrayUnion(
              activeRoomId
            ) as unknown) as string[]
          })
          .then(async () => {
            updateUser({
              joinedRooms: [activeRoomId, ...joinedRooms]
            });

            await chatMessagesApi.addMessage(activeRoomId, {
              text: `${userName} Joined this room.`,
              senderId: "system"
            });
          });
      }
    }
  }, [activeRoomId, joinedRooms, updateUser, userId, userName]);

  return (
    <Wrapper minH="100%">
      {error ? (
        <Container>
          <Error>{error}</Error>
        </Container>
      ) : isLoading ? (
        <Container>
          <Loading />
        </Container>
      ) : (
        <>
          <ChatMessagesDisplay
            activeRoom={activeRoom}
            addMessages={addMessages}
            messagesCount={activeRoom ? activeRoom.messagesCount : 0}
            messages={messages}
            activeRoomId={activeRoomId}
          />
          <ChatMessageInput activeRoomId={activeRoomId} userId={userId} />
        </>
      )}
    </Wrapper>
  );
};

const mapStateToProps = (state: AppState) => {
  const { chatMessages, activeRoom, user } = state;
  return {
    isLoading: chatMessages.isLoading,
    error: chatMessages.error,
    messages: getSortedMessages(chatMessages),
    activeRoomId: activeRoom.activeRoomId,
    userId: user.userInfo.id,
    userName: user.userInfo.name!!,
    joinedRooms: user.userInfo.joinedRooms!!,
    activeRoom: getActiveRoom(state)
  };
};

const mapDispatchToProps = {
  getMessagesStart: chatMessagesActions.getMessagesStart,
  setActiveRoom: activeRoomActions.setActiveRoom,
  updateUser: userActions.updateUser,
  addMessages: chatMessagesActions.addMessages
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMessagesPage);
