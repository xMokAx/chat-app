import React from "react";
import { Link } from "@reach/router";
import { SIGN_UP_EMAIL } from "../constants/routes";
import ProviderAuth from "./ProviderAuth";

const SignUpPage = () => (
  <div>
    <h1>Create account</h1>
    <ProviderAuth />
    <Link to={SIGN_UP_EMAIL}>email</Link>
  </div>
);

export default SignUpPage;
