import React from "react";
import * as ROUTES from "../constants/routes";
import Card from "../styled/Card";
import ButtonAsLink from "../styled/ButtonAsLink";

const LandingPage = () => (
  <Card>
    <h1>Welcome to Chat App</h1>
    <ButtonAsLink to={ROUTES.SIGN_IN} bg="primary" size="l" expanded>
      Sign In
    </ButtonAsLink>
    <ButtonAsLink to={ROUTES.SIGN_UP} bg="primary" size="l" expanded>
      Sign Up
    </ButtonAsLink>
  </Card>
);

export default LandingPage;
