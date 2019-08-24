import React from "react";
import { Link } from "@reach/router";
import { SIGN_IN_EMAIL } from "../constants/routes";
import ProviderAuth from "./ProviderAuth";

const SignInPage = () => (
  <div>
    <h1>Sign in</h1>
    <ProviderAuth />
    <Link to={SIGN_IN_EMAIL}>email</Link>
  </div>
);

export default SignInPage;
