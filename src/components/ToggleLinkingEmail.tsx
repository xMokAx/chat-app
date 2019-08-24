import React from "react";
import { authApi } from "../firebase";
import { FORM_ERROR } from "final-form";
import { Form, Field } from "react-final-form";
import ErrorWithDelay from "./ErrorWithDelay";
import { signInMethodsActions } from "../actions/signInMethods";

interface FormValues {
  password: string;
  confirmPassword: string;
}

interface Errors {
  password?: string;
  confirmPassword?: string;
}

interface Props {
  providerName: string;
  providerId: string;
  isLinked: boolean;
  onlyOneLinked: boolean;
  addMethod: typeof signInMethodsActions.addMethod;
  removeMethod: typeof signInMethodsActions.removeMethod;
  email?: string | null;
}

const ToggleLinkingProvider = ({
  providerName,
  providerId,
  addMethod,
  removeMethod,
  isLinked,
  onlyOneLinked
}: Props) => {
  if (isLinked) {
    const onSubmit = async () => {
      try {
        const response = await authApi.unlinkProvider(providerId);
        console.log(response);
        removeMethod(providerId);
      } catch (e) {
        console.log(e);
        return { [FORM_ERROR]: e.message };
      }
    };
    return (
      <div>
        <Form
          onSubmit={onSubmit}
          render={({ handleSubmit, submitting, submitError }) => (
            <form onSubmit={handleSubmit}>
              {submitting && <p>submitting....</p>}
              {submitError && <p>{submitError}</p>}
              <button type="submit" disabled={submitting || onlyOneLinked}>
                unLink {providerName}
              </button>
            </form>
          )}
        />
      </div>
    );
  }
  const onSubmit = async (values: FormValues) => {
    try {
      const response = await authApi.linkEmail(values.password);
      console.log(response);
      addMethod(providerId);
    } catch (e) {
      console.log(e);
      return { [FORM_ERROR]: e.message };
    }
  };
  return (
    <div>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors: Errors = {};
          const { password, confirmPassword } = values;

          if (!password) {
            errors.password = "Required";
          } else {
            if (password.length < 10) {
              errors.password = "Must be at least 10 characters";
            }
          }
          if (!confirmPassword) {
            errors.confirmPassword = "Required";
          }

          if (confirmPassword !== password) {
            errors.confirmPassword = "Incorrect password";
          }

          return errors;
        }}
        render={({ handleSubmit, submitting, values, submitError }) => (
          <form onSubmit={handleSubmit}>
            {submitting && <p>submitting....</p>}
            {submitError && <p>{submitError}</p>}
            <Field name="password">
              {({ input }) => (
                <div>
                  <input {...input} type="password" placeholder="Password" />
                  <ErrorWithDelay name="password" delay={1000}>
                    {(error: string) => <span>{error}</span>}
                  </ErrorWithDelay>
                </div>
              )}
            </Field>
            <Field name="confirmPassword">
              {({ input }) => (
                <div>
                  <input
                    {...input}
                    type="password"
                    placeholder="Confirm password"
                  />
                  <ErrorWithDelay name="confirmPassword" delay={1000}>
                    {(error: string) => <span>{error}</span>}
                  </ErrorWithDelay>
                </div>
              )}
            </Field>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Link {providerName}
              </button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
};

export default ToggleLinkingProvider;
