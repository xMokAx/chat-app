import React from "react";
import withSignInMethods, { WithSignInMethodsProps } from "./withSignInMethods";

const SignInMethods = ({
  getMethodsStart,
  isLoading,
  error,
  signInMethods,
  email
}: WithSignInMethodsProps) => {
  return (
    <div>
      {isLoading ? (
        <p>loading...</p>
      ) : error ? (
        <div>
          <p>{error}</p>
          <button
            onClick={() => {
              getMethodsStart(email);
            }}
          >
            Try again
          </button>
        </div>
      ) : (
        <div>
          <p>
            You can sign in with one of the following methods then allow other
            sign in methods in your account page:
          </p>
          {signInMethods.map(method => (
            <p key={method}>{method}</p>
          ))}
        </div>
      )}
    </div>
  );
};

export default withSignInMethods(SignInMethods);
