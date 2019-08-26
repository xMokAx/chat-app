import React from "react";
import Button from "../styled/Button";

interface Props {
  provider: string;
  isLoading: boolean;
  onButtonClick: (provider: string) => Promise<void>;
}

const ProviderAuthButton = ({ provider, isLoading, onButtonClick }: Props) => {
  const onClick = () => {
    onButtonClick(provider);
  };
  return (
    <Button onClick={onClick} disabled={isLoading} primary>
      {provider}
    </Button>
  );
};

export default ProviderAuthButton;
