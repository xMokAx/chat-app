import React, { Fragment } from "react";
import * as ROUTES from "../constants/routes";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";

import Nav from "../styled/Nav";
import NavLink from "../styled/NavLink";
import SignOutButton from "./SignOutButton";
import ThemeTogglerButton from "./ThemeTogglerButton";

type NavigationProps = {
  userId: string;
};

const Navigation = ({ userId }: NavigationProps) => (
  <Nav>{userId ? <NavigationAuth /> : <NavigationNonAuth />}</Nav>
);

const NavigationAuth = () => (
  <Fragment>
    <NavLink to={ROUTES.APP}>App</NavLink>
    <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
    <ThemeTogglerButton />
    <SignOutButton />
  </Fragment>
);

const NavigationNonAuth = () => (
  <Fragment>
    <NavLink exact to={ROUTES.BASE}>
      Home
    </NavLink>
    <NavLink to={ROUTES.SIGN_IN}>Sign In</NavLink>
    <NavLink to={ROUTES.SIGN_UP}>Sign Up</NavLink>
    <ThemeTogglerButton />
  </Fragment>
);

const mapStatetoProps = (state: AppState) => ({
  userId: state.user.userInfo.id
});

export default connect(mapStatetoProps)(Navigation);
