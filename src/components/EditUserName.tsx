import React, { useState } from "react";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import FormCard from "../styled/FormCard";
import Text from "../styled/Text";
import LoadingButton from "./LoadingButton";
import Icon from "../styled/Icon";
import Button from "../styled/Button";
import { userApi, authApi } from "../firebase";
import { FlexContainer } from "../styled/Flex";
import InputField from "./InputField";
import { userActions } from "../actions/user";
import { connect } from "react-redux";
import Error from "../styled/Error";

interface FormValues {
  userName: string;
}

type Errors = {
  [K in keyof FormValues]?: string;
};

interface Props {
  userName: string;
  id: string;
  updateUser: typeof userActions.updateUser;
}

const InputEdit = ({ id, userName, updateUser }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const onSubmit = async (values: FormValues) => {
    try {
      await authApi.currentUser().updateProfile({
        displayName: values.userName
      });
      await userApi.updateUser(id, { name: values.userName });
      updateUser({ name: values.userName });
      setIsEditing(false);
    } catch (e) {
      console.log(e);
      return { [FORM_ERROR]: e };
    }
  };
  return isEditing ? (
    <Form
      initialValues={{ userName }}
      onSubmit={onSubmit}
      validate={values => {
        const errors: Errors = {};
        if (!values.userName) {
          errors.userName = "Required";
        } else {
          if (values.userName.length < 3) {
            errors.userName = "Must be at least 3 characters";
          } else if (values.userName === userName) {
            errors.userName = "This is the same old user name.";
          }
        }

        return errors;
      }}
      render={({ handleSubmit, submitting, values, submitError }) => (
        <FormCard onSubmit={handleSubmit}>
          {submitError && <Error>{submitError.message}</Error>}
          <InputField
            name="userName"
            placeholder="New user name"
            icon="person"
          />
          <FlexContainer>
            <LoadingButton type="submit" isLoading={submitting} bg="primary">
              Save
            </LoadingButton>
            <Button
              type="button"
              onClick={() => {
                setIsEditing(false);
              }}
            >
              Cancel
            </Button>
          </FlexContainer>
        </FormCard>
      )}
    />
  ) : (
    <FlexContainer>
      <Icon icon="person" />
      <Text
        as="h2"
        css={`
          margin-bottom: 0;
        `}
      >
        {userName}
      </Text>
      <Button
        bg="primary"
        circle
        aria-label="Edit user name"
        size="s"
        onClick={() => {
          setIsEditing(true);
        }}
      >
        <Icon icon="edit" />
      </Button>
    </FlexContainer>
  );
};

const mapDispatchToProps = {
  updateUser: userActions.updateUser
};

export default connect(
  null,
  mapDispatchToProps
)(InputEdit);
