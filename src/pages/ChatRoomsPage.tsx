import React from "react";
import { connect } from "react-redux";
import styled from "styled-components/macro";
import { AppState } from "../store/configureStore";
import { ChatRoomsState, getFilteredRooms } from "../reducers/chatRooms";
import ChatRoomsList from "../components/ChatRoomsList";
import Text from "../styled/Text";
import ChatRoomsFilter from "../components/ChatRoomsFilter";
import { ImgFluid, Figure } from "../styled/Images";
import { FlexContainer } from "../styled/Flex";
import Error from "../styled/Error";
import Loading from "../styled/Loading";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100vh - 113px);
`;

type Props = Omit<ChatRoomsState, "textFilter" | "activeRoomId"> & {
  userPhoto: string;
};

const ChatRoomsPage = ({ rooms, isLoading, error, userPhoto }: Props) => {
  return (
    <>
      <FlexContainer justify="flex-start">
        <Figure size="40px" m="0">
          <ImgFluid src={userPhoto} />
        </Figure>

        <Text as="h2" m="0">
          Chats
        </Text>
      </FlexContainer>
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
          <ChatRoomsFilter />
          <ChatRoomsList rooms={rooms} />
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ chatRooms, user }: AppState) => ({
  isLoading: chatRooms.isLoading,
  error: chatRooms.error,
  rooms: getFilteredRooms(chatRooms),
  userPhoto: user.userInfo.photo!!
});

export default connect(mapStateToProps)(ChatRoomsPage);
