import React, { useState, useEffect, useRef, Fragment } from "react";
import ProviderAuthButton from "./ProviderAuthButton";
import { userActions } from "../actions/user";
import { connect } from "react-redux";
import { authApi } from "../firebase";
import SignInMethods from "./SignInMethods";

const ERROR_CODE_ACCOUNT_EXISTS =
  "auth/account-exists-with-different-credential";

interface Props {
  authSuccess: typeof userActions.authSuccess;
}

const ProviderAuth = ({ authSuccess }: Props) => {
  const [error, setError] = useState<null | {
    code: string;
    message: string;
    email: string;
  }>(null);
  const [isLoading, setIsLoading] = useState(false);
  const didUnmount = useRef(false);
  const onButtonClick = async (provider: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await authApi.signInWithProvider(provider);
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
        if (!didUnmount.current) {
          console.log("is mounted");
          setError(null);
          setIsLoading(false);
        }
      }
    } catch (e) {
      console.log(e);
      if (!didUnmount.current) {
        console.log("is mounted");
        setError(e);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      didUnmount.current = true;
    };
  }, []);
  return (
    <Fragment>
      {error && (
        <div>
          <p>{error.message}</p>
          {error.code === ERROR_CODE_ACCOUNT_EXISTS && (
            <SignInMethods email={error.email} />
          )}
        </div>
      )}
      {isLoading && <p>loading...</p>}
      <ProviderAuthButton
        provider="google"
        isLoading={isLoading}
        onButtonClick={onButtonClick}
      />
      <ProviderAuthButton
        provider="facebook"
        isLoading={isLoading}
        onButtonClick={onButtonClick}
      />
      <ProviderAuthButton
        provider="github"
        isLoading={isLoading}
        onButtonClick={onButtonClick}
      />
    </Fragment>
  );
};

const mapDispatchToProps = {
  authSuccess: userActions.authSuccess
};
export default connect(
  null,
  mapDispatchToProps
)(ProviderAuth);
