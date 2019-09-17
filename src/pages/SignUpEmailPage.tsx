import React from "react";
import { Form } from "react-final-form";
import { FORM_ERROR } from "final-form";
import { authApi } from "../firebase";
import { userActions } from "../actions/user";
import { connect } from "react-redux";
import SignInMethods from "../components/SignInMethods";
import InputPassword from "../components/InputPassword";
import InputField from "../components/InputField";
import FormCard from "../styled/FormCard";
import Loading from "../styled/Loading";
import Error from "../styled/Error";
import LoadingButton from "../components/LoadingButton";

const ERROR_CODE_ACCOUNT_EXISTS = "auth/email-already-in-use";

interface FormValues {
  userName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type Errors = {
  [K in keyof FormValues]?: string;
};

interface Props {
  authSuccess: typeof userActions.authSuccess;
}

const SignUpEmailPage = ({ authSuccess }: Props) => {
  const onSubmit = async (values: FormValues) => {
    try {
      const response = await authApi.signUpEmail(values.email, values.password);
      console.log(response);
      if (response.user) {
        const updateResponse = await response.user.updateProfile({
          displayName: values.userName
        });
        console.log(updateResponse);
        const { email, uid, photoURL } = response.user;
        if (response.additionalUserInfo) {
          authSuccess(response.additionalUserInfo.isNewUser, {
            name: values.userName,
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
    <Form
      onSubmit={onSubmit}
      validate={values => {
        const errors: Errors = {};
        const { userName, email, password, confirmPassword } = values;
        if (!userName) {
          errors.userName = "Required";
        } else {
          if (userName.length < 3) {
            errors.userName = "Must be at least 3 characters";
          }
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
        <FormCard onSubmit={handleSubmit}>
          <h1>Sign Up</h1>
          {submitting && (
            <div>
              <Loading />
            </div>
          )}
          {submitError && (
            <div>
              <Error>{submitError.message}</Error>
              {submitError.code === ERROR_CODE_ACCOUNT_EXISTS && (
                <SignInMethods email={values.email} />
              )}
            </div>
          )}
          <InputField name="userName" placeholder="User name" icon="person" />
          <InputField name="email" placeholder="Email" icon="email" />
          <InputPassword name="password" placeholder="Password" />
          <InputPassword
            name="confirmPassword"
            placeholder="Confirm password"
          />
          <LoadingButton type="submit" bg="primary" isLoading={submitting}>
            Sign up
          </LoadingButton>
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
)(SignUpEmailPage);
