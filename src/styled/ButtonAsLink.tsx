import React from "react";
import { Link, LinkProps } from "react-router-dom";
import Button, { ButtonProps } from "./Button";

type Props = LinkProps & ButtonProps;

export default Button.withComponent(
  ({ bg, color, size, w, circle, ...linkProps }: Props) => (
    <Link {...linkProps} />
  )
);
