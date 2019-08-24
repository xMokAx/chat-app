import React from "react";
import { Link } from "@reach/router";
import * as ROUTES from "../constants/routes";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";

import SignOutButton from "./SignOutButton";

type NavigationProps = {
  userId?: string;
};

const Navigation = ({ userId }: NavigationProps) => (
  <div>{userId ? <NavigationAuth /> : <NavigationNonAuth />}</div>
);

const NavigationAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.APP}>App</Link>
    </li>
    <li>
      <Link to={ROUTES.ACCOUNT}>Account</Link>
    </li>
    <li>
      <SignOutButton />
    </li>
  </ul>
);

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
    </li>
    <li>
      <Link to={ROUTES.BASE}>Home</Link>
    </li>
  </ul>
);

const mapStatetoProps = (state: AppState) => ({
  userId: state.user.userInfo.id
});

export default connect(mapStatetoProps)(Navigation);
