import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import * as firebase from "firebase/app";
import { AppState } from "../store/configureStore";
import { chatMessagesActions } from "../actions/chatMessages";
import {
  getSortedMessages,
  RoomMessagesState,
  getRoomMessagesState
} from "../reducers/chatMessages";
import { useParams, useHistory } from "react-router";
import { userApi, chatMessagesApi, chatRoomsApi } from "../firebase";
import { userActions } from "../actions/user";
import { Room, chatRoomsActions } from "../actions/chatRooms";
import ChatMessageInput from "../components/ChatMessageInput";
import Wrapper from "../styled/Wrapper";
import ChatMessagesDisplay from "../components/ChatMessagesDisplay";
import Error from "../styled/Error";
import Loading from "../styled/Loading";
import { getActiveRoom } from "../reducers/chatRooms";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
`;

type Props = RoomMessagesState & {
  getMessagesStart: typeof chatMessagesActions.getMessagesStart;
  setActiveRoom: typeof chatRoomsActions.setActiveRoom;
  updateUser: typeof userActions.updateUser;
  getMessagesSuccess: typeof chatMessagesActions.getMessagesSuccess;
  activeRoomId: string;
  userId: string;
  userName: string;
  joinedRooms: string[];
  activeRoom?: Room;
  isLoadingMyRooms: boolean;
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
  getMessagesSuccess,
  activeRoom,
  isLoadingMyRooms
}: Props) => {
  const history = useHistory();
  const { id } = useParams();
  const [isFetching, setIsFetching] = useState(false);
  useEffect(() => {
    if (id) {
      if (id !== activeRoomId) {
        setIsFetching(false);
        setActiveRoom(id);
      } else if (id === activeRoomId) {
        if (!isLoadingMyRooms) {
          if (!activeRoom) {
            history.push(`/chat`);
          } else {
            if (!messages.length && !isFetching) {
              setIsFetching(true);
              getMessagesStart(id);
            }
          }
        }
      }
    }
  }, [
    activeRoom,
    activeRoomId,
    getMessagesStart,
    history,
    id,
    isFetching,
    isLoading,
    isLoadingMyRooms,
    messages.length,
    setActiveRoom
  ]);

  useEffect(() => {
    if (activeRoomId && activeRoom && activeRoomId === activeRoom.id) {
      if (!activeRoom.people.includes(userId)) {
        chatRoomsApi
          .updateRoom(activeRoomId, {
            people: (firebase.firestore.FieldValue.arrayUnion(
              userId
            ) as unknown) as string[]
          })
          .then(async () => {
            await userApi.updateUser(userId, {
              joinedRooms: (firebase.firestore.FieldValue.arrayUnion(
                activeRoomId
              ) as unknown) as string[]
            });
            await chatMessagesApi.addMessage(activeRoomId, {
              text: `${userName} Joined this room.`,
              senderId: "system"
            });
          });
      }
    }
  }, [activeRoom, activeRoomId, joinedRooms, updateUser, userId, userName]);

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
            getMessagesSuccess={getMessagesSuccess}
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
  const { chatRooms, user } = state;
  return {
    ...getRoomMessagesState(state),
    messages: getSortedMessages(state),
    activeRoomId: chatRooms.activeRoomId,
    isLoadingMyRooms: chatRooms.MY_ROOMS.isLoading,
    userId: user.userInfo.id,
    userName: user.userInfo.name!!,
    joinedRooms: user.userInfo.joinedRooms!!,
    activeRoom: getActiveRoom(chatRooms)
  };
};

const mapDispatchToProps = {
  getMessagesStart: chatMessagesActions.getMessagesStart,
  setActiveRoom: chatRoomsActions.setActiveRoom,
  updateUser: userActions.updateUser,
  getMessagesSuccess: chatMessagesActions.getMessagesSuccess
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatMessagesPage);
