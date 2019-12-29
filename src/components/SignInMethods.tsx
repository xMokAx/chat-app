import React, { Fragment } from "react";
import withSignInMethods, { WithSignInMethodsProps } from "./withSignInMethods";
import Loading from "../styled/Loading";
import Error from "../styled/Error";
import Button from "../styled/Button";

const SignInMethods = ({
  getMethodsStart,
  isLoading,
  error,
  signInMethods,
  email
}: WithSignInMethodsProps) => {
  return (
    <Fragment>
      {isLoading ? (
        <Loading />
      ) : error ? (
        <div>
          <Error>{error}</Error>
          <Button
            color="green"
            onClick={() => {
              getMethodsStart(email);
            }}
          >
            Try again
          </Button>
        </div>
      ) : (
        <div>
          <p>
            You can sign in with one of the following methods then allow other
            sign in methods in your account page:
          </p>
          {signInMethods.map(method => (
            <p key={method}>
              {method === "password" ? `email + ${method}` : method}
            </p>
          ))}
        </div>
      )}
    </Fragment>
  );
};

export default withSignInMethods(SignInMethods);
