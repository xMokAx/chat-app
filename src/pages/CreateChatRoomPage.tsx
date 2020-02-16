import React from "react";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import FormCard from "../styled/FormCard";
import Loading from "../styled/Loading";
import Error from "../styled/Error";
import Text from "../styled/Text";
import InputField from "../components/InputField";
import LoadingButton from "../components/LoadingButton";
import { chatRoomsApi, userApi } from "../firebase";
import { useHistory } from "react-router";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import Select, { Option } from "../styled/Select";
import { Room, MY_ROOMS } from "../actions/chatRooms";
import { getActiveRoom } from "../reducers/chatRooms";
import firebase from "firebase";

interface CreateFormValues {
  name: string;
  desc: string;
}

type CreateFormErrors = {
  [K in keyof CreateFormValues]?: string;
};

interface DeleteFormValues {
  room: string;
}

type DeleteFormErrors = {
  [K in keyof DeleteFormValues]?: string;
};

interface StateProps {
  createdRooms?: string[];
  roomsToDelete: Option[];
  activeRoom?: Room;
  userId: string;
}

type Props = StateProps;

const CreateChatRoomPage = ({
  createdRooms,
  roomsToDelete,
  activeRoom,
  userId
}: Props) => {
  const history = useHistory();
  const createdRoomsCount = createdRooms ? createdRooms.length : 0;
  if (createdRoomsCount === 3) {
    const onSubmit = async (values: DeleteFormValues) => {
      try {
        await chatRoomsApi.deleteRoom(values.room);
        await userApi.updateUser(userId, {
          createdRooms: (firebase.firestore.FieldValue.arrayRemove(
            values.room
          ) as unknown) as string[]
        });
        if (activeRoom && values.room === activeRoom.id) {
          history.push(`/chat`);
        }
      } catch (e) {
        return { [FORM_ERROR]: e.message };
      }
    };
    return (
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors: DeleteFormErrors = {};
          if (!values.room) {
            errors.room = "Please, choose a room";
          }

          return errors;
        }}
        render={({ handleSubmit, submitting, submitError, form, errors }) => (
          <FormCard
            onSubmit={async e => {
              await handleSubmit(e);
              if (!errors.room) {
                form.reset();
              }
            }}
          >
            <Text as="h2">Delete Room</Text>
            <Text align="center" color="green">
              You can't create more than 3 rooms. Delete a room to create a new
              room.
            </Text>
            {submitting && (
              <div>
                <Loading />
              </div>
            )}
            {submitError && <Error>{submitError}</Error>}
            <Field name="room">
              {({ input, meta }) => {
                return (
                  <>
                    <Select
                      {...input}
                      defaultOption={{ value: "", text: "Choose a room" }}
                      options={roomsToDelete}
                    />
                    {meta.error && meta.touched && <Error>{meta.error}</Error>}
                    <LoadingButton
                      type="submit"
                      bg="red"
                      isLoading={submitting}
                    >
                      Delete room
                    </LoadingButton>
                  </>
                );
              }}
            </Field>
          </FormCard>
        )}
      />
    );
  }
  const onSubmit = async (values: CreateFormValues) => {
    try {
      const roomId = await chatRoomsApi.addRoom({
        name: values.name.toLowerCase(),
        desc: values.desc.toLowerCase()
      });
      history.push(`/chat/room/${roomId}`);
    } catch (e) {
      return { [FORM_ERROR]: e.message };
    }
  };
  return (
    <Form
      onSubmit={onSubmit}
      validate={values => {
        const errors: CreateFormErrors = {};
        const { name, desc } = values;
        if (!name) {
          errors.name = "Required";
        } else {
          if (!/^[\w -]+$/.test(name)) {
            errors.name =
              "Should only includes: letters, numbers, _, - and space";
          }
        }

        if (!desc) {
          errors.desc = "Required";
        } else {
          if (desc.length > 100) {
            errors.desc = "Max characters count is 100";
          }
        }
        return errors;
      }}
      render={({ handleSubmit, submitting, submitError, form, errors }) => (
        <FormCard
          onSubmit={async e => {
            await handleSubmit(e);
            if (!errors.name && !errors.desc) {
              form.reset();
            }
          }}
        >
          <Text as="h2">Create Room</Text>
          {submitting && (
            <div>
              <Loading />
            </div>
          )}
          {submitError && <Error>{submitError}</Error>}
          <InputField name="name" placeholder="Room name" label="Name" />
          <InputField
            name="desc"
            placeholder="Room description"
            label="Description"
          />
          <LoadingButton type="submit" bg="primary" isLoading={submitting}>
            Create room
          </LoadingButton>
        </FormCard>
      )}
    />
  );
};

const mapStateToProps = (state: AppState) => {
  const { user, chatRooms } = state;
  const createdRooms = user.userInfo.createdRooms;
  return {
    createdRooms: createdRooms,
    userId: user.userInfo.id,
    activeRoom: getActiveRoom(chatRooms),
    roomsToDelete: chatRooms[MY_ROOMS].rooms
      .filter(r => {
        if (createdRooms) {
          return createdRooms.includes(r.id);
        } else {
          return false;
        }
      })
      .map(
        (r): Option => {
          return {
            value: r.id,
            text: r.name
          };
        }
      )
  };
};

export default connect(mapStateToProps)(CreateChatRoomPage);
