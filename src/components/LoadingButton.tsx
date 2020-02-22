import React from "react";
import Button, { ButtonProps } from "../styled/Button";
import Loading from "../styled/Loading";

type Props = ButtonProps &
  React.ButtonHTMLAttributes<HTMLButtonElement> & {
    isLoading: boolean;
    disabled?: boolean;
  };

const LoadingButton = ({ children, isLoading, disabled, ...props }: Props) => (
  <Button disabled={disabled || isLoading} {...props}>
    {children} {isLoading && <Loading small disabled />}
  </Button>
);

export default LoadingButton;
