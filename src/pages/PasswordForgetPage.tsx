import React from "react";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { authApi } from "../firebase";
import { Link, useLocation } from "react-router-dom";
import { SIGN_IN_EMAIL, PASSWORD_FORGET } from "../constants/routes";
import InputField from "../components/InputField";
import FormCard from "../styled/FormCard";
import Loading from "../styled/Loading";
import Text from "../styled/Text";
import LoadingButton from "../components/LoadingButton";
import Error from "../styled/Error";

interface FormValues {
  email: string;
}

type Errors = {
  [K in keyof FormValues]?: string;
};

const PassWordForgetForm = () => {
  const location = useLocation();
  const onSubmit = async (values: FormValues) => {
    try {
      await authApi.resetPassword(values.email);
    } catch (e) {
      return { [FORM_ERROR]: e.message };
    }
  };
  return (
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
      render={({ handleSubmit, submitting, submitError, form }) => (
        <FormCard
          onSubmit={async event => {
            const error = await handleSubmit(event);
            if (error) {
              return error;
            }
            form.reset();
          }}
        >
          <h1>Reset password</h1>
          {submitting && (
            <div>
              <Loading />
            </div>
          )}
          {submitError && <Error>{submitError}</Error>}
          <Text size="14px">
            To reset your password, enter the email you use to sign in.
          </Text>
          <InputField name="email" placeholder="Email" icon="email" />
          <LoadingButton type="submit" bg="primary" isLoading={submitting}>
            Get reset link
          </LoadingButton>
          {location.pathname === PASSWORD_FORGET && (
            <Text size="14px">
              Never mind!{" "}
              <Link to={SIGN_IN_EMAIL}>
                <strong>Take me back to Log in</strong>
              </Link>
            </Text>
          )}
        </FormCard>
      )}
    />
  );
};

export default PassWordForgetForm;
