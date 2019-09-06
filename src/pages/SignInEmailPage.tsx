import React from "react";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { authApi } from "../firebase";
import { Link } from "@reach/router";
import { PASSWORD_FORGET, SIGN_UP } from "../constants/routes";
import { userActions } from "../actions/user";
import { connect } from "react-redux";
import FormCard from "../styled/FormCard";
import Loading from "../styled/Loading";
import Text from "../styled/Text";
import InputPassword from "../components/InputPassword";
import InputField from "../components/InputField";
import LoadingButton from "../components/LoadingButton";

interface FormValues {
  email: string;
  password: string;
}

type Errors = {
  [K in keyof FormValues]?: string;
};

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
      render={({ handleSubmit, submitting, submitError }) => (
        <FormCard onSubmit={handleSubmit}>
          <h1>Sign In</h1>
          {submitting && (
            <div>
              <Loading />
            </div>
          )}
          {submitError && (
            <Text size="14px" color="red">
              {submitError}
            </Text>
          )}
          <InputField name="email" placeholder="Email" icon="email" />
          <InputPassword name="password" placeholder="Password" />
          <Link to={PASSWORD_FORGET}>
            <small>Forgot password ?</small>
          </Link>
          <LoadingButton type="submit" bg="primary" isLoading={submitting}>
            Log in
          </LoadingButton>
          <Text size="14px">
            Don’t have an account yet?{" "}
            <Link to={SIGN_UP}>
              <strong>Sign up</strong>
            </Link>
          </Text>
        </FormCard>
      )}
    />
  );
};

const mapDispatchToProps = {
  authSuccess: userActions.authSuccess
};

export default connect(
  null,
  mapDispatchToProps
)(SignInEmailPage);
