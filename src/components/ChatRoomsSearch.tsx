import React, { useCallback, FormEvent, ChangeEvent, useState } from "react";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon from "../styled/Icon";
import Button from "../styled/Button";
import { FlexContainer } from "../styled/Flex";
import { chatRoomsActions } from "../actions/chatRooms";
import { connect } from "react-redux";

interface Props {
  getRoomsByQueryStart: typeof chatRoomsActions.getRoomsByQueryStart;
}

const ChatRoomsSearch = ({ getRoomsByQueryStart }: Props) => {
  const [roomsQuery, setRoomsQuery] = useState("");
  const onChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setRoomsQuery(e.target.value.replace(/[^\w -]+/, ""));
  }, []);
  const onSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      if (!roomsQuery) {
        return;
      }
      getRoomsByQueryStart(roomsQuery.toLowerCase());
    },
    [getRoomsByQueryStart, roomsQuery]
  );
  return (
    <form onSubmit={onSubmit}>
      <FlexContainer p="16px 0 0 0">
        <InputGroup hasIconRight>
          <Input
            value={roomsQuery}
            onChange={onChange}
            type="text"
            placeholder="Search Rooms"
            aria-label="Search Rooms"
          />
          <Button type="submit" aria-label="Search" color="primary" size="s">
            <Icon icon="search" size="32px" />
          </Button>
        </InputGroup>
      </FlexContainer>
    </form>
  );
};

const mapDispatchToProps = {
  getRoomsByQueryStart: chatRoomsActions.getRoomsByQueryStart
};

export default connect(null, mapDispatchToProps)(ChatRoomsSearch);
