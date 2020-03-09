import {
  chatRoomsActions,
  MY_ROOMS,
  GET_ROOMS_START,
  ChatRoomsActionTypes,
  GET_ROOMS_BY_QUERY_START,
  QUERY_ROOMS,
  GET_ROOMS_SUCCESS,
  GET_ROOMS_FAILURE,
  ADD_ROOM,
  Room,
  RECENT_ROOMS,
  UPDATE_ROOM,
  DELETE_ROOM,
  SET_TEXT_FILTER,
  SET_ROOMS_TYPE,
  SET_ACTIVE_ROOM
} from "../chatRooms";

describe("chatRooms actions", () => {
  const room: Room = {
    id: "123",
    name: "my room",
    desc: "test room",
    createdAt: {
      seconds: 1000000,
      nanoseconds: 1000000
    } as firebase.firestore.Timestamp,
    messagesCount: 1,
    creator: {
      id: "123",
      name: "Ahmed"
    },
    people: ["Ahmed"]
  };

  it("should create an action to start chatRooms saga", () => {
    const expectedAction: ChatRoomsActionTypes = {
      type: GET_ROOMS_START,
      roomsType: MY_ROOMS
    };
    expect(chatRoomsActions.getRoomsStart(MY_ROOMS)).toEqual(expectedAction);
  });

  it("should create an action to start chatRoomsByQuery saga", () => {
    const expectedAction: ChatRoomsActionTypes = {
      type: GET_ROOMS_BY_QUERY_START,
      query: "query",
      roomsType: QUERY_ROOMS
    };
    expect(chatRoomsActions.getRoomsByQueryStart("query")).toEqual(
      expectedAction
    );
  });

  it("should create an action to set the rooms depending on roomsType", () => {
    const expectedAction: ChatRoomsActionTypes = {
      type: GET_ROOMS_SUCCESS,
      roomsType: MY_ROOMS,
      rooms: [room]
    };
    expect(chatRoomsActions.getRoomsSuccess([room], MY_ROOMS)).toEqual(
      expectedAction
    );
  });

  it("should create an action to set error fetching the rooms depending on roomsType", () => {
    const error = "error";
    const expectedAction: ChatRoomsActionTypes = {
      type: GET_ROOMS_FAILURE,
      roomsType: MY_ROOMS,
      error
    };
    expect(chatRoomsActions.getRoomsFailure(error, MY_ROOMS)).toEqual(
      expectedAction
    );
  });

  it("should create an action to add a room depending on roomsType", () => {
    const expectedAction: ChatRoomsActionTypes = {
      type: ADD_ROOM,
      roomsType: RECENT_ROOMS,
      room
    };
    expect(chatRoomsActions.addRoom(room, RECENT_ROOMS)).toEqual(
      expectedAction
    );
  });

  it("should create an action to update a room depending on roomsType", () => {
    const expectedAction: ChatRoomsActionTypes = {
      type: UPDATE_ROOM,
      roomsType: RECENT_ROOMS,
      room
    };
    expect(chatRoomsActions.updateRoom(room, RECENT_ROOMS)).toEqual(
      expectedAction
    );
  });

  it("should create an action to delete a room depending on roomsType", () => {
    const id = "123";
    const expectedAction: ChatRoomsActionTypes = {
      type: DELETE_ROOM,
      roomsType: RECENT_ROOMS,
      id
    };
    expect(chatRoomsActions.deleteRoom(id, RECENT_ROOMS)).toEqual(
      expectedAction
    );
  });

  it("should create an action to set rooms textFilter depending on roomsType", () => {
    const textFilter = "re";
    const expectedAction: ChatRoomsActionTypes = {
      type: SET_TEXT_FILTER,
      roomsType: RECENT_ROOMS,
      textFilter
    };
    expect(chatRoomsActions.setTextFilter(textFilter, RECENT_ROOMS)).toEqual(
      expectedAction
    );
  });

  it("should create an action to set roomsType", () => {
    const roomsType = MY_ROOMS;
    const expectedAction: ChatRoomsActionTypes = {
      type: SET_ROOMS_TYPE,
      roomsType
    };
    expect(chatRoomsActions.setRoomsType(roomsType)).toEqual(expectedAction);
  });

  it("should create an action to set the activeRoom", () => {
    const id = "123";
    const expectedAction: ChatRoomsActionTypes = {
      type: SET_ACTIVE_ROOM,
      id
    };
    expect(chatRoomsActions.setActiveRoom(id)).toEqual(expectedAction);
  });
});
