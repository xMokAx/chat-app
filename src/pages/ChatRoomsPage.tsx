import React, { useEffect, useContext } from "react";
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
import {
  RoomsType,
  chatRoomsActions,
  QUERY_ROOMS,
  MY_ROOMS,
  RECENT_ROOMS
} from "../actions/chatRooms";
import Button, { ButtonProps } from "../styled/Button";
import ChatRoomsSearch from "../components/ChatRoomsSearch";
import { ConnectionContext } from "../components/Layout";

interface ContainerProps {
  showConnectionStatus: boolean;
  roomsSearch: boolean;
}

const Container = styled.div<ContainerProps>`
  display: flex;
  justify-content: center;
  align-items: center;
  height: ${props =>
    `calc(100vh - 168px - ${props.showConnectionStatus ? "33px" : "0px"} - ${
      props.roomsSearch ? "56px" : "0px"
    })`};
`;

type CustomButtonProps = ButtonProps & {
  active: boolean;
};

export const CustomButton = styled(Button)<CustomButtonProps>`
  &:hover {
    background-color: ${props => props.theme.colors.bgSec};
  }
  background-color: ${props => props.active && props.theme.colors.bgSec};
  color: ${props => props.active && props.theme.colors.textMain};
`;

type StateProps = Omit<ChatRoomsState, "textFilter" | "activeRoomId"> & {
  userPhoto: string;
  roomsType: RoomsType;
};

interface DispatchProps {
  getRoomsStart: typeof chatRoomsActions.getRoomsStart;
  setRoomsType: typeof chatRoomsActions.setRoomsType;
}

type Props = StateProps & DispatchProps;

const ChatRoomsPage = ({
  rooms,
  isLoading,
  error,
  userPhoto,
  getRoomsStart,
  roomsType,
  setRoomsType
}: Props) => {
  const { showConnectionStatus } = useContext(ConnectionContext);
  const roomsSearch = roomsType === QUERY_ROOMS;
  useEffect(() => {
    if (!rooms.length && !error && !roomsSearch) {
      getRoomsStart(roomsType);
    }
  }, [error, getRoomsStart, rooms.length, roomsSearch, roomsType]);
  return (
    <>
      <FlexContainer justify="flex-start">
        <Figure size="40px" m="0">
          <ImgFluid src={userPhoto} />
        </Figure>

        <Text as="h2" m="0">
          Rooms
        </Text>
      </FlexContainer>

      <FlexContainer justify="flex-start" p="16px 0 0 0">
        <CustomButton
          onClick={() => {
            setRoomsType(MY_ROOMS);
          }}
          active={roomsType === MY_ROOMS}
          size="s"
        >
          My
        </CustomButton>
        <CustomButton
          onClick={() => {
            setRoomsType(RECENT_ROOMS);
          }}
          active={roomsType === RECENT_ROOMS}
          size="s"
        >
          Recent
        </CustomButton>
        <CustomButton
          onClick={() => {
            setRoomsType(QUERY_ROOMS);
          }}
          active={roomsSearch}
          size="s"
        >
          Search
        </CustomButton>
      </FlexContainer>
      {roomsSearch && <ChatRoomsSearch />}
      {error ? (
        <Container
          showConnectionStatus={showConnectionStatus}
          roomsSearch={roomsSearch}
        >
          <Error align="center">{error}</Error>
        </Container>
      ) : isLoading ? (
        <Container
          showConnectionStatus={showConnectionStatus}
          roomsSearch={roomsSearch}
        >
          <Loading />
        </Container>
      ) : (
        <>
          <ChatRoomsFilter />
          <ChatRoomsList rooms={rooms} roomsSearch={roomsSearch} />
        </>
      )}
    </>
  );
};

const mapStateToProps = ({ chatRooms, user }: AppState) => ({
  isLoading: chatRooms[chatRooms.roomsType].isLoading,
  error: chatRooms[chatRooms.roomsType].error,
  rooms: getFilteredRooms(chatRooms[chatRooms.roomsType]),
  roomsType: chatRooms.roomsType,
  userPhoto: user.userInfo.photo!!
});

const mapDispatchToProps = {
  getRoomsStart: chatRoomsActions.getRoomsStart,
  setRoomsType: chatRoomsActions.setRoomsType
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomsPage);
