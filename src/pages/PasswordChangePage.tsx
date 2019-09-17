import React from "react";
import { Form } from "react-final-form";
import { FORM_ERROR, FormApi } from "final-form";
import { authApi } from "../firebase";
import InputPassword from "../components/InputPassword";
import FormCard from "../styled/FormCard";
import Loading from "../styled/Loading";
import Error from "../styled/Error";
import LoadingButton from "../components/LoadingButton";

interface FormValues {
  newPassword: string;
  oldPassword: string;
}

type Errors = {
  [K in keyof FormValues]?: string;
};

const PasswordChangeForm = () => {
  const onSubmit = async (values: FormValues, form: FormApi<FormValues>) => {
    try {
      const response = await authApi.updatePassword(values.newPassword);
      console.log(response);
    } catch (e) {
      console.log(e);
      return { [FORM_ERROR]: e.message };
    }
  };
  return (
    <Form
      onSubmit={onSubmit}
      validate={values => {
        const errors: Errors = {};
        const { newPassword, oldPassword } = values;

        if (!newPassword) {
          errors.newPassword = "Required";
        } else {
          if (newPassword.length < 10) {
            errors.newPassword = "Must be at least 10 characters";
          }
        }
        if (!oldPassword) {
          errors.oldPassword = "Required";
        } else {
          if (oldPassword.length < 10) {
            errors.oldPassword = "Must be at least 10 characters";
          }
        }

        if (newPassword && oldPassword && newPassword === oldPassword) {
          errors.newPassword = "Must not be equal to old password";
        }

        return errors;
      }}
      render={({ handleSubmit, submitting, submitError, form }) => {
        return (
          <FormCard
            onSubmit={async event => {
              const error = await handleSubmit(event);
              if (error) {
                console.log("Error returned from Form onSubmit", error);
                return error;
              }
              form.reset();
            }}
          >
            <h1>Change pasword</h1>
            {submitting && (
              <div>
                <Loading />
              </div>
            )}
            {submitError && <Error>{submitError}</Error>}
            <InputPassword name="oldPassword" placeholder="Old password" />
            <InputPassword name="newPassword" placeholder="New password" />
            <LoadingButton type="submit" bg="primary" isLoading={submitting}>
              Update password
            </LoadingButton>
          </FormCard>
        );
      }}
    />
  );
};

export default PasswordChangeForm;
