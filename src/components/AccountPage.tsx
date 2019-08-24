import React from "react";
import { Link } from "@reach/router";
import * as ROUTES from "../constants/routes";

interface Props {
  children: React.ReactNode;
}

const AccountPage = ({ children }: Props) => (
  <div>
    <ul>
      <li>
        <Link to={ROUTES.ACCOUNT}>Profile</Link>
      </li>
      <li>
        <Link to={`${ROUTES.ACCOUNT}${ROUTES.PASSWORD_CHANGE}`}>
          Change password
        </Link>
      </li>
      <li>
        <Link to={`${ROUTES.ACCOUNT}${ROUTES.PASSWORD_FORGET}`}>
          Forgot password
        </Link>
      </li>
    </ul>
    <div>{children}</div>
  </div>
);

export default AccountPage;
