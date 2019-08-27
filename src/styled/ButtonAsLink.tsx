import React from "react";
import { Link } from "@reach/router";
import Button from "../styled/Button";

export default Button.withComponent(({ primary, large, ...props }) => (
  <Link {...props} />
));
