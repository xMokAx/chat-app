import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import { authApi } from "../firebase";
import Button from "../styled/Button";

const SignOutButon = () => (
  <Button css="padding: 6px;" onClick={authApi.signOut}>
    Log out
  </Button>
);

export default SignOutButon;
