import React from "react";
import { SIGN_IN_EMAIL } from "../constants/routes";
import ProviderAuth from "../components/ProviderAuth";
import ButtonAsLink from "../styled/ButtonAsLink";
import Card from "../styled/Card";

const SignInPage = () => (
  <Card>
    <h1>Sign in</h1>
    <ProviderAuth />
    <ButtonAsLink to={SIGN_IN_EMAIL} bg="red" size="l" expanded>
      Email
    </ButtonAsLink>
  </Card>
);

export default SignInPage;
