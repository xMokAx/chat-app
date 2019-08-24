import React from "react";
import ErrorWithDelay from "./ErrorWithDelay";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { authApi } from "../firebase";
import { userActions } from "../actions/user";
import { connect } from "react-redux";
import SignInMethods from "./SignInMethods";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

interface FormValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface Errors {
  userName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
}

interface Props {
  authSuccess: typeof userActions.authSuccess;
}

const SignUpEmailPage = ({ authSuccess }: Props) => {
  const onSubmit = async (values: FormValues) => {
    try {
      const response = await authApi.signUpEmail(values.email, values.password);
      console.log(response);
      if (response.user) {
        const updateRespond = await response.user.updateProfile({
          displayName: values.userName
        });
        console.log(updateRespond);
        const { displayName, email, uid, photoURL } = response.user;
        if (response.additionalUserInfo) {
          authSuccess(response.additionalUserInfo.isNewUser, {
            name: displayName,
            email,
            id: uid,
            photo: photoURL
          });
        }
      }
    } catch (e) {
      console.log(e);
      return { [FORM_ERROR]: e };
    }
  };
  return (
    <div>
      <h1>Sign Up</h1>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors: Errors = {};
          const { userName, email, password, confirmPassword } = values;
          if (!userName) {
            errors.userName = "Required";
          }
          if (!email) {
            errors.email = "Required";
          } else {
            if (!/\S+@\S+\.\S+/.test(email)) {
              errors.email = "Invalid email";
            }
          }

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
            {submitError && (
              <div>
                <p>{submitError.message}</p>
                {submitError.code === ERROR_CODE_ACCOUNT_EXISTS && (
                  <SignInMethods email={values.email} />
                )}
              </div>
            )}
            <Field name="userName">
              {({ input }) => (
                <div>
                  <input {...input} type="text" placeholder="User name" />
                  <ErrorWithDelay name="userName" delay={1000}>
                    {(error: string) => <span>{error}</span>}
                  </ErrorWithDelay>
                </div>
              )}
            </Field>
            <Field name="email">
              {({ input }) => (
                <div>
                  <input {...input} type="text" placeholder="Email" />
                  <ErrorWithDelay name="email" delay={1000}>
                    {(error: string) => <span>{error}</span>}
                  </ErrorWithDelay>
                </div>
              )}
            </Field>
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
                Sign up
              </button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
    </div>
  );
};

const mapDispatchToProps = {
  authSuccess: userActions.authSuccess
};

export default connect(
  null,
  mapDispatchToProps
)(SignUpEmailPage);
