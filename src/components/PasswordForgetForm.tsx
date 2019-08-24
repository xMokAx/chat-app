import React from "react";
import ErrorWithDelay from "./ErrorWithDelay";
import { Form, Field } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { authApi } from "../firebase";
import { Link } from "@reach/router";
import { SIGN_IN_EMAIL } from "../constants/routes";

interface FormValues {
  email: string;
}

interface Errors {
  email?: string;
}

const PassWordForgetForm = () => {
  const onSubmit = async (values: FormValues) => {
    try {
      const response = await authApi.resetPassword(values.email);
      console.log(response);
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
          const { email } = values;
          if (!email) {
            errors.email = "Required";
          } else {
            if (!/\S+@\S+\.\S+/.test(email)) {
              errors.email = "Invalid email";
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
            <div className="buttons">
              <button type="submit" disabled={submitting}>
                Get reset link
              </button>
            </div>
            <pre>{JSON.stringify(values, null, 2)}</pre>
          </form>
        )}
      />
      <p>
        Nevermind! <Link to={SIGN_IN_EMAIL}>Take me back to Log in</Link>
      </p>
    </div>
  );
};

export default PassWordForgetForm;
