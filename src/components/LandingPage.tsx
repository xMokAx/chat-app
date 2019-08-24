import React from "react";
import { Link } from "@reach/router";
import * as ROUTES from "../constants/routes";

const LandingPage = () => (
  <div>
    <h1>Welcome to Chat App</h1>
    <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    <Link to={ROUTES.SIGN_UP}>Sign Up</Link>
  </div>
);

export default LandingPage;
