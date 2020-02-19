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
  size,
  onClick,
  disabled,
  w
}: Props) => (
  <Button
    type={type}
    disabled={disabled || isLoading}
    bg={bg}
    size={size}
    onClick={onClick}
    w={w}
  >
    {children} {isLoading && <Loading small disabled />}
  </Button>
);

export default LoadingButton;
