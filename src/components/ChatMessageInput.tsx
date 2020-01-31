import React, { useCallback, FormEvent, ChangeEvent, useState } from "react";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon from "../styled/Icon";
import Button from "../styled/Button";
import { FlexContainer } from "../styled/Flex";
import { chatMessagesApi } from "../firebase";

interface Props {
  activeRoomId: string;
  userId: string;
}

const ChatMessageInput = ({ activeRoomId, userId }: Props) => {
  const [message, setMessage] = useState("");
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMessage(e.target.value);
  }, []);
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!message) {
        return;
      }
      await chatMessagesApi.addMessage(activeRoomId, {
        text: message,
        senderId: userId
      });
      setMessage("");
    },
    [activeRoomId, message, userId]
  );
  return (
    <form onSubmit={onSubmit}>
      <FlexContainer>
        <InputGroup>
          <Input
            value={message}
            onChange={onChange}
            type="text"
            placeholder="Message"
            aria-label="Message"
          />
        </InputGroup>
        <Button
          type="submit"
          aria-label="Send Message"
          color="primary"
          size="s"
        >
          <Icon icon="send" size="32px" />
        </Button>
      </FlexContainer>
    </form>
  );
};

export default ChatMessageInput;
