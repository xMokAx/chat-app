import React, { useEffect, useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled, { DefaultTheme } from "styled-components/macro";
import { FlexContainer } from "../styled/Flex";
import Text from "../styled/Text";
import { Room } from "../actions/chatRooms";
import NavLink from "../styled/NavLink";
import moment from "moment";
import { Figure, ImgFluid, FakeImage } from "../styled/Images";
import { userApi } from "../firebase";
import { User } from "../actions/user";

interface Props {
  room: Room;
}

const ChatRoomsListItem = ({
  room: { id, name, desc, createdAt, lastMessage, people }
}: Props) => {
  const [lastMessageSender, setLastMessageSender] = useState<null | Pick<
    User,
    "id" | "name" | "photo"
  >>(null);
  const created = createdAt && moment(createdAt.seconds * 1000).format("l");
  const isSystemMsg = lastMessage && lastMessage.senderId === "system";
  useEffect(() => {
    if (lastMessage && !isSystemMsg)
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
  }, [isSystemMsg, lastMessage]);
  return (
    <NavLink
      to={`/chat/room/${id}`}
      css={`
        color: ${(props: { theme: DefaultTheme }) =>
          props.theme.colors.textSec};
        padding: 8px 4px;
        display: block;
        text-align: left;
      `}
    >
      <FlexContainer justify="space-between">
        <Text as="strong">{name}</Text>
        <Text as="span" size="12px">
          {created}
        </Text>
      </FlexContainer>
      <FlexContainer justify="space-between">
        <Text as="span" size="14px">
          {desc}
        </Text>
        <Text as="span" size="14px">
          {people.length} people
        </Text>
      </FlexContainer>
      {lastMessage && (
        <FlexContainer justify="space-between">
          <Text as="span" size="14px">
            {!isSystemMsg && lastMessageSender && (
              <Figure size="24px" m="0 4px 0 0">
                {lastMessageSender.photo ? (
                  <ImgFluid
                    alt={lastMessageSender.name!!}
                    src={lastMessageSender.photo}
                    circle
                  />
                ) : (
                  <FakeImage title={lastMessageSender.name!!} circle />
                )}
              </Figure>
            )}
            {lastMessage.text}
          </Text>
          <Text as="span" size="12px">
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

export default ChatRoomsListItem;
