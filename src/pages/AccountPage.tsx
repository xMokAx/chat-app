import React from "react";
import * as ROUTES from "../constants/routes";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { Redirect } from "react-router-dom";

interface StateProps {
  hasPassword: boolean;
}

interface OwnProps {
  children: React.ReactNode;
}

type Props = OwnProps & StateProps;

const AccountPage = ({ children, hasPassword }: Props) => (
  <>
    {!hasPassword && <Redirect to={ROUTES.ACCOUNT} />}
    {children}
  </>
);

const mapStateToProps = (state: AppState) => ({
  hasPassword: state.signInMethods.signInMethods.includes("password")
});

export default connect(mapStateToProps)(AccountPage);
