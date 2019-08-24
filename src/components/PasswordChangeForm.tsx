import React from "react";
import ErrorWithDelay from "./ErrorWithDelay";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { authApi } from "../firebase";

interface FormValues {
  newPassword: string;
  oldPassword: string;
}

interface Errors {
  newPassword?: string;
  oldPassword?: string;
}

const PasswordChangeForm = () => {
  const onSubmit = async (values: FormValues) => {
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

        if (newPassword === oldPassword) {
          errors.newPassword = "Same Password";
        }

        return errors;
      }}
      render={({ handleSubmit, submitting, values, submitError }) => (
        <form onSubmit={handleSubmit}>
          {submitting && <p>submitting....</p>}
          {submitError && <p>{submitError}</p>}
          <Field name="newPassword">
            {({ input }) => (
              <div>
                <input {...input} type="password" placeholder="New password" />
                <ErrorWithDelay name="newPassword" delay={1000}>
                  {(error: string) => <span>{error}</span>}
                </ErrorWithDelay>
              </div>
            )}
          </Field>
          <Field name="oldPassword">
            {({ input }) => (
              <div>
                <input {...input} type="password" placeholder="Old password" />
                <ErrorWithDelay name="oldPassword" delay={1000}>
                  {(error: string) => <span>{error}</span>}
                </ErrorWithDelay>
              </div>
            )}
          </Field>
          <div className="buttons">
            <button type="submit" disabled={submitting}>
              Update password
            </button>
          </div>
          <pre>{JSON.stringify(values, null, 2)}</pre>
        </form>
      )}
    />
  );
};

export default PasswordChangeForm;
