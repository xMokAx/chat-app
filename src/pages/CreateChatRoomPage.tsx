import React from "react";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import FormCard from "../styled/FormCard";
import Loading from "../styled/Loading";
import Error from "../styled/Error";
import Text from "../styled/Text";
import InputField from "../components/InputField";
import LoadingButton from "../components/LoadingButton";
import { chatRoomsApi } from "../firebase";
import { useHistory } from "react-router";

interface FormValues {
  name: string;
  desc: string;
}

type Errors = {
  [K in keyof FormValues]?: string;
};

const CreateChatRoomPage = () => {
  const history = useHistory();
  const onSubmit = async (values: FormValues) => {
    try {
      const roomId = await chatRoomsApi.addRoom({
        name: values.name,
        desc: values.desc
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
        const errors: Errors = {};
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
      render={({ handleSubmit, submitting, submitError, form }) => (
        <FormCard
          onSubmit={async e => {
            await handleSubmit(e);
            form.reset();
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

export default CreateChatRoomPage;
