import React, { ReactNode } from "react";
import Button, { ButtonProps } from "../styled/Button";
import Loading from "../styled/Loading";

type Props = ButtonProps & {
  children: ReactNode;
  isLoading: boolean;
  type: "submit" | "button";
  onClick?: () => void | Promise<void>;
  disabled?: boolean;
};

const LoadingButton = ({
  children,
  isLoading,
  type,
  bg,
  large,
  onClick,
  disabled
}: Props) => (
  <Button
    type={type}
    disabled={disabled || isLoading}
    bg={bg}
    large={large}
    onClick={onClick}
  >
    {children} {isLoading && <Loading small disabled />}
  </Button>
);

export default LoadingButton;
