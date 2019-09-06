import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import * as ROUTES from "../constants/routes";
import Nav from "../styled/Nav";
import NavLink from "../styled/NavLink";
import Container from "../styled/Container";
import { Row, Col } from "../styled/Flex";

interface Props {
  children: React.ReactNode;
}

const AccountPage = ({ children }: Props) => (
  <Container>
    <Row>
      <Col width={3}>
        <Nav
          css={`
            @media (min-width: 768px) {
              flex-direction: column;
            }
          `}
        >
          <NavLink exact to={ROUTES.ACCOUNT}>
            Profile
          </NavLink>
          <NavLink to={`${ROUTES.ACCOUNT}${ROUTES.PASSWORD_CHANGE}`}>
            Change password
          </NavLink>
          <NavLink to={`${ROUTES.ACCOUNT}${ROUTES.PASSWORD_FORGET}`}>
            Forgot password
          </NavLink>
        </Nav>
      </Col>
      <Col>{children}</Col>
    </Row>
  </Container>
);

export default AccountPage;
