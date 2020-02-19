import React, { useCallback, useState, useEffect, useRef } from "react";
import { connect } from "react-redux";
import * as H from "history";
import * as firebase from "firebase/app";
import styled, { DefaultTheme } from "styled-components/macro";
import { FlexContainer, Row, Col } from "../styled/Flex";
import { Room } from "../actions/chatRooms";
import Text from "../styled/Text";
import { Figure, ImgFluid } from "../styled/Images";
import { Person } from "../actions/people";
import { userApi, chatRoomsApi, chatMessagesApi } from "../firebase";
import LoadingButton from "./LoadingButton";
import Modal from "../styled/Modal";
import Button from "../styled/Button";
import { useMediaQuery } from "react-responsive";
import { AppState } from "../store/configureStore";
import { getPeople, getPerson } from "../reducers/people";

const CustomText = styled(Text)`
  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;
  text-align: center;
  @media screen and (max-width: 600px) {
    text-align: left;
  }
`;

interface StateProps {
  people: Person[];
  roomCreator?: Person;
}

interface OwnProps {
  activeRoom?: Room;
  userId: string;
  history: H.History;
  userName: string;
  isLeaving: boolean;
  setIsLeaving: React.Dispatch<React.SetStateAction<boolean>>;
}

type Props = StateProps & OwnProps;

const ChatMessagesPageHeader = ({
  activeRoom,
  roomCreator,
  userId,
  userName,
  history,
  isLeaving,
  setIsLeaving,
  people
}: Props) => {
  const isSmall = useMediaQuery({
    query: "(max-width: 600px)"
  });
  const [showPeople, setShowPeople] = useState(false);
  const toggleModal = useCallback(() => {
    setShowPeople(!showPeople);
  }, [showPeople]);
  const activeRoomId = activeRoom ? activeRoom!!.id : "";
  const isMounted = useRef(true);
  useEffect(() => {
    return () => {
      isMounted.current = false;
      setIsLeaving(false);
    };
  }, [setIsLeaving]);
  const onLeaveClick = useCallback(async () => {
    setIsLeaving(true);
    history.push("/chat");
    await Promise.all([
      userApi.updateUser(userId, {
        joinedRooms: (firebase.firestore.FieldValue.arrayRemove(
          activeRoomId
        ) as unknown) as string[]
      }),
      chatRoomsApi.updateRoom(activeRoomId, {
        people: (firebase.firestore.FieldValue.arrayRemove(
          userId
        ) as unknown) as string[]
      }),
      chatMessagesApi.addMessage(activeRoomId, {
        senderId: "system",
        text: `${userName} left this room`
      })
    ]);
    if (isMounted.current) {
      setIsLeaving(false);
    }
  }, [setIsLeaving, history, userId, activeRoomId, userName, isMounted]);
  return (
    <>
      <Row
        isMobile
        css={`
          margin-top: -8px;
          margin-bottom: 8px;
          padding: 0 8px;
          height: 50px;
          align-items: center;
          justify-content: space-between;
          border-bottom: solid 1px
            ${(props: { theme: DefaultTheme }) => props.theme.colors.bgSec};
          @media screen and (max-width: 1023px) {
            padding-right: 44px;
          }
        `}
      >
        <Col width={4} p="0 8px 0 0" break="0px" hiddenBreak="600px">
          {roomCreator && (
            <FlexContainer
              childrenM="4px"
              title="Room owner"
              justify="flex-start"
            >
              {roomCreator.photo && (
                <Figure size="32px" m="0">
                  <ImgFluid
                    src={roomCreator.photo}
                    alt={`${roomCreator.name}'s avatar`}
                  />
                </Figure>
              )}
              {roomCreator && (
                <CustomText m="0" size="14px">
                  {roomCreator.name}
                </CustomText>
              )}
            </FlexContainer>
          )}
        </Col>
        <Col width={isSmall ? 5 : 4} p="0 8px 0 0" break="0px">
          {activeRoom && (
            <div>
              <CustomText m="0">{activeRoom.name}</CustomText>
              <CustomText size="14px" m="0" color="textSec">
                {activeRoom.desc}
              </CustomText>
            </div>
          )}
        </Col>
        <Col width={isSmall ? 5 : 4} p="0" break="0px">
          <FlexContainer childrenM="8px" justify="flex-end">
            {activeRoom && (
              <Button bg="green" size="s" onClick={toggleModal}>
                <CustomText m="0" size="14px">
                  {activeRoom.people.length} People
                </CustomText>
              </Button>
            )}
            <LoadingButton
              size="s"
              bg="red"
              onClick={onLeaveClick}
              type="button"
              isLoading={isLeaving}
              disabled={isLeaving}
            >
              <Text m="0" size="14px">
                Leave
              </Text>
            </LoadingButton>
          </FlexContainer>
        </Col>
      </Row>
      <Modal isOpen={showPeople} onRequestClose={toggleModal}>
        {people.length &&
          people.map(p => (
            <FlexContainer
              justify="flex-start"
              childrenM="4px"
              p="4px 0"
              css={`
                border-bottom: solid 1px
                  ${(props: { theme: DefaultTheme }) =>
                    props.theme.colors.bgSec};
              `}
              key={p.id}
            >
              <Figure size="32px" m="0">
                <ImgFluid src={p.photo!!} alt={`${p.name}'s avatar`} />
              </Figure>

              <Text m="0" size="14px">
                {p.name}
              </Text>
            </FlexContainer>
          ))}
      </Modal>
    </>
  );
};

const mapStateToProps = (state: AppState, { activeRoom }: OwnProps) => ({
  people: activeRoom ? getPeople(state.people, activeRoom.id) : [],
  roomCreator: activeRoom ? getPerson(state, activeRoom.creator.id) : undefined
});

export default connect(mapStateToProps)(ChatMessagesPageHeader);
