import React from "react";
import { SIGN_UP_EMAIL } from "../constants/routes";
import ProviderAuth from "../components/ProviderAuth";
import ButtonAsLink from "../styled/ButtonAsLink";
import Card from "../styled/Card";

const SignUpPage = () => (
  <Card>
    <h1>Sign up</h1>
    <ProviderAuth />
    <ButtonAsLink to={SIGN_UP_EMAIL} bg="red" size="l" w="100%">
      Email
    </ButtonAsLink>
  </Card>
);

export default SignUpPage;
