import React, { Fragment } from "react";
import { DefaultTheme } from "styled-components/macro";
import * as ROUTES from "../constants/routes";
import Nav from "../styled/Nav";
import NavLink from "../styled/NavLink";
import { Row, Col } from "../styled/Flex";
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

const AccountPage = ({ children, hasPassword }: Props) => {
  if (!hasPassword) {
    return <Redirect to={ROUTES.ACCOUNT} />;
  }

  return (
    <Row>
      <Col
        width={3}
        css={`
          @media only screen and (min-width: 1024px) {
            border-right: 1px solid
              ${(props: { theme: DefaultTheme }) => props.theme.colors.bgSec};
          }
        `}
      >
        <Nav
          css={`
            @media only screen and (min-width: 1024px) {
              flex-direction: column;
              border-bottom: none;
            }
          `}
        >
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
        </Nav>
      </Col>
      <Col>{children}</Col>
    </Row>
  );
};

const mapStateToProps = (state: AppState) => ({
  hasPassword: state.signInMethods.signInMethods.includes("password")
});

export default connect(mapStateToProps)(AccountPage);
