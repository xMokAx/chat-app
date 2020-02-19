import React, { useEffect, useState } from "react";
import { DefaultTheme } from "styled-components/macro";
import { FlexContainer } from "../styled/Flex";
import Text from "../styled/Text";
import { Room } from "../actions/chatRooms";
import NavLink from "../styled/NavLink";
import moment from "moment";
import { Figure, ImgFluid, FakeImage } from "../styled/Images";
import { userApi } from "../firebase";
import { User } from "../actions/user";
import { connect } from "react-redux";
import { getPerson } from "../reducers/people";
import { AppState } from "../store/configureStore";
import { Person } from "../actions/people";

interface OwnProps {
  room: Room;
}

interface StateProps {
  lastSender?: Person;
}

type Props = OwnProps & StateProps;

const ChatRoomsListItem = ({
  room: { id, name, desc, createdAt, lastMessage, people },
  lastSender
}: Props) => {
  const [lastMessageSender, setLastMessageSender] = useState<null | Pick<
    User,
    "id" | "name" | "photo"
  >>(null);
  const created = createdAt && moment(createdAt.seconds * 1000).format("l");
  const isSystemMsg = lastMessage && lastMessage.senderId === "system";
  let sender = lastSender ? lastSender : lastMessageSender;
  useEffect(() => {
    if (lastMessage && !isSystemMsg && !lastSender)
      userApi.getUser(lastMessage.senderId).then(doc => {
        if (doc.exists) {
          const { id, name, photo } = doc.data() as User;
          setLastMessageSender({
            id,
            name,
            photo
          });
        }
      });
  }, [isSystemMsg, lastMessage, lastSender]);
  return (
    <NavLink
      to={`/chat/room/${id}`}
      css={`
        color: ${(props: { theme: DefaultTheme }) =>
          props.theme.colors.textSec};
        padding: 8px;
        display: block;
        text-align: left;
      `}
    >
      <FlexContainer justify="space-between">
        <Text
          as="strong"
          css={`
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        >
          {name}
        </Text>
        <Text
          as="span"
          size="12px"
          css={`
            white-space: nowrap;
          `}
        >
          {created}
        </Text>
      </FlexContainer>
      <FlexContainer justify="space-between">
        <Text
          as="span"
          size="14px"
          css={`
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          `}
        >
          {desc}
        </Text>
        <Text
          as="span"
          size="14px"
          css={`
            white-space: nowrap;
          `}
        >
          {people.length} people
        </Text>
      </FlexContainer>
      {lastMessage && (
        <FlexContainer justify="space-between">
          <Text
            as="span"
            size="12px"
            css={`
              overflow: hidden;
              text-overflow: ellipsis;
              white-space: nowrap;
            `}
          >
            {!isSystemMsg && sender && (
              <Figure size="24px" m="0 4px 0 0">
                {sender.photo ? (
                  <ImgFluid alt={sender.name!!} src={sender.photo} circle />
                ) : (
                  <FakeImage title={sender.name!!} circle />
                )}
              </Figure>
            )}
            {lastMessage.text}
          </Text>
          <Text
            as="span"
            size="12px"
            css={`
              white-space: nowrap;
            `}
          >
            {moment(
              isSystemMsg
                ? createdAt.seconds * 1000
                : lastMessage.createdAt.seconds * 1000
            ).fromNow()}
          </Text>
        </FlexContainer>
      )}
    </NavLink>
  );
};

const mapStateToProps = (state: AppState, { room }: OwnProps) => ({
  lastSender:
    room.lastMessage && room.lastMessage.senderId !== "system"
      ? getPerson(state, room.lastMessage.senderId)
      : undefined
});

export default connect(mapStateToProps)(ChatRoomsListItem);
