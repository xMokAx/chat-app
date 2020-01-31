import React from "react";
import moment from "moment";
import styled from "styled-components/macro";
import { FlexContainer } from "../styled/Flex";
import { Message } from "../actions/chatRooms";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import Text from "../styled/Text";
import { ImgFluid, Figure, FakeImage } from "../styled/Images";
import { Person } from "../actions/activeRoom";
import { getPerson } from "../reducers/activeRoom";

interface MessageContainerProps {
  isUser: boolean;
}

const MessageContainer = styled.div<MessageContainerProps>`
  background-color: ${props =>
    props.isUser ? props.theme.colors.primary : props.theme.colors.bgSec};
  padding: 8px;
  border-radius: 0.25rem;
  margin-left: ${props => !props.isUser && "32px"};
`;

interface StateProps {
  userId: string;
  messageSender?: Person;
}

interface OwnProps {
  message: Message;
}

type Props = StateProps & OwnProps;

const ChatMessage = ({
  message: { text, id, createdAt, senderId },
  userId,
  messageSender
}: Props) => {
  const isUser = userId === senderId;
  const created = createdAt
    ? moment(createdAt.seconds * 1000).format("LLLL")
    : "Just now";

  if (senderId === "system") {
    return (
      <FlexContainer wr justify="space-evenly" m="0 0 16px">
        <Text color="grey" align="center" size="12px" m="0">
          {text}
        </Text>
        <Text color="grey" size="12px" m="0">
          {created}
        </Text>
      </FlexContainer>
    );
  }

  return (
    <FlexContainer
      justify={isUser ? "flex-end" : "flex-start"}
      m="0 0 4px"
      css="position: relative;"
    >
      {!isUser && messageSender && (
        <Figure size="24px" css="position: absolute; top: calc(100% - 28px);">
          {messageSender.photo ? (
            <ImgFluid
              circle
              src={messageSender.photo}
              alt={messageSender.name!!}
            />
          ) : (
            <FakeImage circle />
          )}
        </Figure>
      )}
      <MessageContainer isUser={isUser}>
        <Text p="0" m="0" color="textMain">
          {text}
        </Text>
      </MessageContainer>
    </FlexContainer>
  );
};

const mapStateToProps = (
  { user, activeRoom }: AppState,
  ownProps: OwnProps
) => ({
  userId: user.userInfo.id,
  messageSender: getPerson(activeRoom, ownProps.message.senderId)
});

export default connect(mapStateToProps)(ChatMessage);
