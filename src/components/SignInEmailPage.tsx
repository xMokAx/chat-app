import React from "react";
import ErrorWithDelay from "./ErrorWithDelay";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { authApi } from "../firebase";
import { Link } from "@reach/router";
import { PASSWORD_FORGET, SIGN_UP } from "../constants/routes";
import { userActions } from "../actions/user";
import { connect } from "react-redux";

interface FormValues {
  email: string;
  password: string;
}

interface Errors {
  email?: string;
  password?: string;
}

interface Props {
  authSuccess: typeof userActions.authSuccess;
}

const SignInEmailPage = ({ authSuccess }: Props) => {
  const onSubmit = async (values: FormValues) => {
    try {
      const response = await authApi.signInEmail(values.email, values.password);
      console.log(response);
      if (response.user) {
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
      return { [FORM_ERROR]: e.message };
    }
  };
  return (
    <div>
      <h1>Sign In</h1>
      <Form
        onSubmit={onSubmit}
        validate={values => {
          const errors: Errors = {};
          const { email, password } = values;
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
          return errors;
        }}
        render={({ handleSubmit, submitting, values, submitError }) => (
          <form onSubmit={handleSubmit}>
            {submitting && <p>submitting....</p>}
            {submitError && <p>{submitError}</p>}
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
            <Link to={PASSWORD_FORGET}>Forgot password ?</Link>
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Log in
              </button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
      <Link to={SIGN_UP}>Sign up</Link>
    </div>
  );
};

const mapDispatchToProps = {
  authSuccess: userActions.authSuccess
};

export default connect(
  null,
  mapDispatchToProps
)(SignInEmailPage);
