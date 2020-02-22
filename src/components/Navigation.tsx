import React, { Fragment, useState, useCallback } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import * as ROUTES from "../constants/routes";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";

import Nav from "../styled/Nav";
import NavLink from "../styled/NavLink";
import SignOutButton from "./SignOutButton";
import ThemeTogglerButton from "./ThemeTogglerButton";
import Dropdown from "../styled/Dropdown";
import { Figure, ImgFluid } from "../styled/Images";

interface NavAuthProps {
  hasPassword: boolean;
  userPhoto: string;
  userName: string;
}

type NavigationProps = NavAuthProps & {
  userId: string;
};

const Navigation = ({
  userId,
  hasPassword,
  userPhoto,
  userName
}: NavigationProps) => (
  <Nav>
    {userId ? (
      <NavigationAuth
        hasPassword={hasPassword}
        userPhoto={userPhoto}
        userName={userName}
      />
    ) : (
      <NavigationNonAuth />
    )}
  </Nav>
);

const NavigationAuth = ({ hasPassword, userPhoto, userName }: NavAuthProps) => {
  const [isMenuActive, setIsMenuActive] = useState(false);
  const openOrCloseMenu = useCallback(
    (menuState: boolean) => {
      setIsMenuActive(menuState);
    },
    [setIsMenuActive]
  );
  return (
    <Fragment>
      <NavLink to={ROUTES.APP} m="3px 3px 3px 0">
        Chat
      </NavLink>
      <NavLink to={ROUTES.ACCOUNT}>Account</NavLink>
      <ThemeTogglerButton />
      <Figure size="40px" m="0" css="position: relative;">
        <ImgFluid src={userPhoto} alt={`${userName}'s avatar`} />
        <Dropdown
          containerStyle={`
            position: absolute;
            bottom: -16px;
            right: -8px;
          `}
          isActive={isMenuActive}
          left="-147px"
          circle
          openOrCloseMenu={openOrCloseMenu}
        >
          <NavLink to={ROUTES.APP}>Chat</NavLink>
          <NavLink exact to={ROUTES.ACCOUNT}>
            Profile
          </NavLink>
          {hasPassword && (
            <Fragment>
              <NavLink to={`${ROUTES.ACCOUNT}${ROUTES.PASSWORD_CHANGE}`}>
                Change password
              </NavLink>
              <NavLink to={`${ROUTES.ACCOUNT}${ROUTES.PASSWORD_FORGET}`}>
                Forgot password
              </NavLink>
            </Fragment>
          )}
          <SignOutButton />
        </Dropdown>
      </Figure>
    </Fragment>
  );
};

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
  userId: state.user.userInfo.id,
  userPhoto: state.user.userInfo.photo!!,
  userName: state.user.userInfo.name!!,
  hasPassword: state.signInMethods.signInMethods.includes("password")
});

export default connect(mapStatetoProps)(Navigation);
