import React, { useState, useCallback, useContext, useEffect } from "react";
import { DefaultTheme } from "styled-components/macro";
import { useMediaQuery } from "react-responsive";
import ChatRoomsPage from "./ChatRoomsPage";
import CreateChatRoomPage from "./CreateChatRoomPage";
import { Row, Col, FlexContainer } from "../styled/Flex";
import ChatMessagesPage from "./ChatMessagesPage";
import { Switch, Route } from "react-router";
import RouterPage from "./RouterPage";
import { APP } from "../constants/routes";
import Text from "../styled/Text";
import Dropdown from "../styled/Dropdown";
import NavLink from "../styled/NavLink";
import * as ROUTES from "../constants/routes";
import { Link } from "react-router-dom";
import { chatRoomsActions, RoomsType, QUERY_ROOMS } from "../actions/chatRooms";
import { ConnectionContext } from "../components/Layout";
import { connect } from "react-redux";
import { getFilteredRooms, ChatRoomsState } from "../reducers/chatRooms";
import { AppState } from "../store/configureStore";

type StateProps = Omit<ChatRoomsState, "textFilter"> & {
  roomsType: RoomsType;
};

interface DispatchProps {
  getRoomsStart: typeof chatRoomsActions.getRoomsStart;
}

type Props = StateProps & DispatchProps;

const ChatPage = ({
  rooms,
  error,
  isLoading,
  roomsType,
  getRoomsStart
}: Props) => {
  const roomsSearch = roomsType === QUERY_ROOMS;
  useEffect(() => {
    if (!rooms.length && !error && !roomsSearch && !isLoading) {
      getRoomsStart(roomsType);
    }
  }, [error, getRoomsStart, isLoading, rooms.length, roomsSearch, roomsType]);
  const isLarge = useMediaQuery({
    query: "(min-width: 1024px)"
  });
  const [isMenuActive, setIsMenuActive] = useState(false);
  const openOrCloseMenu = useCallback(
    (menuState: boolean) => {
      setIsMenuActive(menuState);
    },
    [setIsMenuActive]
  );
  const { showConnectionStatus } = useContext(ConnectionContext);
  return (
    <Row
      css={`
        height: calc(100vh - ${showConnectionStatus ? "90px" : "57px"});
      `}
    >
      {isLarge ? (
        <>
          <Col width={3}>
            <ChatRoomsPage />
          </Col>
          <Col
            css={`
              border-right: 1px solid
                ${(props: { theme: DefaultTheme }) => props.theme.colors.bgSec};
              border-left: 1px solid
                ${(props: { theme: DefaultTheme }) => props.theme.colors.bgSec};
            `}
          >
            <Switch>
              <RouterPage path={ROUTES.CHAT_ROOM} privateRoute>
                <ChatMessagesPage />
              </RouterPage>
              <Route>
                <FlexContainer h="100%">
                  <Text color="textMain" weight="600">
                    Join a room to start chatting.
                  </Text>
                </FlexContainer>
              </Route>
            </Switch>
          </Col>
          <Col width={3}>
            <CreateChatRoomPage />
          </Col>{" "}
        </>
      ) : (
        <Col css="position:relative">
          <Dropdown
            containerStyle={`
            position: fixed;
            top: ${showConnectionStatus ? "100px" : "68px"};
            right: 8px;
            z-index: 2
          `}
            buttonBG="blue"
            isActive={isMenuActive}
            left="-147px"
            circleButton
            openOrCloseMenu={openOrCloseMenu}
          >
            <NavLink exact to={ROUTES.APP}>
              Rooms
            </NavLink>
            <NavLink exact to={ROUTES.CREATE_ROOM}>
              Create room
            </NavLink>
          </Dropdown>
          <Switch>
            <RouterPage exact path={APP} privateRoute>
              <ChatRoomsPage />
            </RouterPage>
            <RouterPage path={ROUTES.CREATE_ROOM} privateRoute>
              <CreateChatRoomPage />
            </RouterPage>
            <RouterPage path={ROUTES.CHAT_ROOM} privateRoute>
              <ChatMessagesPage />
            </RouterPage>
            <Route>
              <FlexContainer h="100%" column>
                <Text color="textMain" weight="600">
                  Join a room to start chatting.
                </Text>
                <Link to={ROUTES.APP}>Rooms</Link>
              </FlexContainer>
            </Route>
          </Switch>
        </Col>
      )}
    </Row>
  );
};

const mapStateToProps = ({ chatRooms }: AppState) => ({
  isLoading: chatRooms[chatRooms.roomsType].isLoading,
  error: chatRooms[chatRooms.roomsType].error,
  rooms: getFilteredRooms(chatRooms[chatRooms.roomsType]),
  roomsType: chatRooms.roomsType
});

const mapDispatchToProps = {
  getRoomsStart: chatRoomsActions.getRoomsStart
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
