import React from "react";
import { authApi } from "../firebase";
import Button from "../styled/Button";

const SignOutButon = () => <Button onClick={authApi.signOut}>Log out</Button>;

export default SignOutButon;
