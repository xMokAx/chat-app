import React, { useState, useEffect, useRef, Fragment } from "react";
import ProviderAuthButton from "./ProviderAuthButton";
import { userActions } from "../actions/user";
import { connect } from "react-redux";
import { authApi } from "../firebase";
import SignInMethods from "./SignInMethods";
import Loading from "../styled/Loading";
import Text from "../styled/Text";

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
  const isMounted = useRef(true);
  const onButtonClick = async (provider: string) => {
    setError(null);
    setIsLoading(true);
    try {
      const response = await authApi.signInWithProvider(provider);
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
        if (isMounted.current) {
          setError(null);
          setIsLoading(false);
        }
      }
    } catch (e) {
      if (isMounted.current) {
        setError(e);
        setIsLoading(false);
      }
    }
  };

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);
  return (
    <Fragment>
      {error && (
        <Fragment>
          <Text color="red">{error.message}</Text>
          {error.code === ERROR_CODE_ACCOUNT_EXISTS && (
            <SignInMethods email={error.email} />
          )}
        </Fragment>
      )}
      {isLoading && <Loading />}
      <ProviderAuthButton
        color="green"
        provider="Google"
        isLoading={isLoading}
        onButtonClick={onButtonClick}
      />
      <ProviderAuthButton
        color="blue"
        provider="Facebook"
        isLoading={isLoading}
        onButtonClick={onButtonClick}
      />
      <ProviderAuthButton
        color="grey"
        provider="Github"
        isLoading={isLoading}
        onButtonClick={onButtonClick}
      />
    </Fragment>
  );
};

const mapDispatchToProps = {
  authSuccess: userActions.authSuccess
};
export default connect(null, mapDispatchToProps)(ProviderAuth);
