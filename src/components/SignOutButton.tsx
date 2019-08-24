import React from "react";
import { authApi } from "../firebase";

const SignOutButon = () => <button onClick={authApi.signOut}>Log out</button>;

export default SignOutButon;
