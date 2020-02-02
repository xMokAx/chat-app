import React, { useContext } from "react";
import styled from "styled-components/macro";
import { Rooms } from "../actions/chatRooms";
import ChatRoomsListItem from "./ChatRoomsListItem";
import { ConnectionContext } from "./Layout";

interface ContainerProps {
  showConnectionStatus: boolean;
}

const Container = styled.div<ContainerProps>`
  height: calc(
    100vh - ${props => (props.showConnectionStatus ? "218px" : "185px")}
  );
  overflow-y: auto;
  scrollbar-width: none; /* Firefox */
  -ms-overflow-style: none; /* Internet Explorer 10+ */
  &::-webkit-scrollbar {
    /* WebKit */
    width: 0;
    height: 0;
  }
  -webkit-overflow-scrolling: touch;
  margin: 0 -4px;
`;

interface Props {
  rooms: Rooms;
}

const ChatRoomsList = ({ rooms }: Props) => {
  const { showConnectionStatus } = useContext(ConnectionContext);
  return (
    <Container showConnectionStatus={showConnectionStatus}>
      {rooms.map(room => {
        return <ChatRoomsListItem room={room} key={room.id} />;
      })}
    </Container>
  );
};

export default ChatRoomsList;
