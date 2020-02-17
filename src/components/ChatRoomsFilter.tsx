import React, { ChangeEvent, useCallback } from "react";
import styled from "styled-components/macro";
import { connect } from "react-redux";
import InputGroup from "../styled/InputGroup";
import Input from "../styled/Input";
import Icon from "../styled/Icon";
import { AppState } from "../store/configureStore";
import { chatRoomsActions, RoomsType } from "../actions/chatRooms";

const Container = styled.div`
  padding: 16px 0 5px 0;
`;

interface Props {
  textFilter: string;
  setTextFilter: typeof chatRoomsActions.setTextFilter;
  roomsType: RoomsType;
}

const ChatRoomsFilter = ({ textFilter, setTextFilter, roomsType }: Props) => {
  const onTextFilterChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      setTextFilter(e.target.value, roomsType);
    },
    [roomsType, setTextFilter]
  );
  return (
    <Container>
      <InputGroup hasIconLeft>
        <Input
          onChange={onTextFilterChange}
          value={textFilter}
          type="text"
          placeholder="Filter Rooms"
          aria-label="Filter Rooms"
        />
        <Icon isLeft icon="filter_list" />
      </InputGroup>
    </Container>
  );
};

const mapStateToProps = ({ chatRooms }: AppState) => ({
  textFilter: chatRooms[chatRooms.roomsType].textFilter,
  roomsType: chatRooms.roomsType
});

const mapDispatchToProps = {
  setTextFilter: chatRoomsActions.setTextFilter
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatRoomsFilter);
