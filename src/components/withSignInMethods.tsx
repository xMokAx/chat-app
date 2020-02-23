import React, { ComponentType, useEffect } from "react";
import { connect } from "react-redux";
import { SignInMethodsState } from "../reducers/signInMethods";
import { signInMethodsActions } from "../actions/signInMethods";
import { AppState } from "../store/configureStore";

//  the email prop received in profile page has type string | undefined | null
interface OwnProps {
  email: string;
}

type StateProps = SignInMethodsState;

interface DispatchProps {
  getMethodsStart: typeof signInMethodsActions.getMethodsStart;
  addMethod: typeof signInMethodsActions.addMethod;
  removeMethod: typeof signInMethodsActions.removeMethod;
}

export type WithSignInMethodsProps = OwnProps & StateProps & DispatchProps;

const withSignInMethods = (
  Component: ComponentType<WithSignInMethodsProps>
) => {
  const SignInMethodsHOC = ({
    email,
    getMethodsStart,
    isLoading,
    error,
    signInMethods,
    addMethod,
    removeMethod
  }: WithSignInMethodsProps) => {
    useEffect(() => {
      if (!signInMethods.length) {
        getMethodsStart(email);
      }
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);
    return (
      <Component
        email={email}
        addMethod={addMethod}
        removeMethod={removeMethod}
        getMethodsStart={getMethodsStart}
        isLoading={isLoading}
        error={error}
        signInMethods={signInMethods}
      />
    );
  };
  const mapStateToProps = ({ signInMethods }: AppState) => ({
    ...signInMethods
  });

  const mapDispatchToProps = {
    getMethodsStart: signInMethodsActions.getMethodsStart,
    addMethod: signInMethodsActions.addMethod,
    removeMethod: signInMethodsActions.removeMethod
  };

  return connect(mapStateToProps, mapDispatchToProps)(SignInMethodsHOC);
};

export default withSignInMethods;
