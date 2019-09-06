import React from "react";
import { authApi } from "../firebase";
import { FORM_ERROR } from "final-form";
import { Form } from "react-final-form";
import { signInMethodsActions } from "../actions/signInMethods";
import LoadingButton from "./LoadingButton";
import FormCard from "../styled/FormCard";
import InputPassword from "./InputPassword";
import Loading from "../styled/Loading";
import Text from "../styled/Text";

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
            <FormCard onSubmit={handleSubmit}>
              {submitError && <Text color="red">{submitError}</Text>}
              <LoadingButton
                type="submit"
                bg="red"
                isLoading={submitting}
                disabled={onlyOneLinked}
              >
                unLink {providerName}
              </LoadingButton>
            </FormCard>
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
        render={({ handleSubmit, submitting, values, submitError, form }) => (
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
            {submitting && (
              <div>
                <Loading />
              </div>
            )}
            {submitError && <Text color="red">{submitError}</Text>}
            <InputPassword name="password" placeholder="Password" />
            <InputPassword
              name="confirmPassword"
              placeholder="Confirm password"
            />
            <LoadingButton bg="green" type="submit" isLoading={submitting}>
              Link {providerName}
            </LoadingButton>
          </FormCard>
        )}
      />
    </div>
  );
};

export default ToggleLinkingProvider;
