import React, { useState } from "react";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import FormCard from "../styled/FormCard";
import Text from "../styled/Text";
import Error from "../styled/Error";
import LoadingButton from "./LoadingButton";
import Icon from "../styled/Icon";
import Button from "../styled/Button";
import { userApi, authApi } from "../firebase";
import { FlexContainer } from "../styled/Flex";
import InputField from "./InputField";
import { userActions } from "../actions/user";
import { connect } from "react-redux";

interface FormValues {
  email: string;
}

type Errors = {
  [K in keyof FormValues]?: string;
};

interface Props {
  email: string;
  id: string;
  updateUser: typeof userActions.updateUser;
}

const InputEdit = ({ id, email, updateUser }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const onSubmit = async (values: FormValues) => {
    try {
      await authApi.currentUser().updateEmail(values.email);
      await userApi.updateUser(id, { email: values.email });
      updateUser({ email: values.email });
      setIsEditing(false);
    } catch (e) {
      return { [FORM_ERROR]: e };
    }
  };
  return isEditing ? (
    <Form
      initialValues={{ email }}
      onSubmit={onSubmit}
      validate={values => {
        const errors: Errors = {};
        if (!values.email) {
          errors.email = "Required";
        } else {
          if (!/\S+@\S+\.\S+/.test(values.email)) {
            errors.email = "Invalid email";
          } else if (values.email === email) {
            errors.email = "This is the same old email.";
          }
        }

        return errors;
      }}
      render={({ handleSubmit, submitting, submitError }) => (
        <FormCard onSubmit={handleSubmit}>
          {submitError && <Error>{submitError.message}</Error>}
          <InputField name="email" placeholder="New email" icon="email" />
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
    <FlexContainer
      css={`
        max-width: calc(100vw - 32px);
      `}
    >
      <Icon icon="email" />
      <Text
        size="18px"
        css={`
          margin-bottom: 0;
          overflow: hidden;
          text-overflow: ellipsis;
        `}
      >
        <strong>{email}</strong>
      </Text>
      <Button
        bg="primary"
        circle
        aria-label="Edit email"
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
