import React from "react";
import Button from "../styled/Button";

interface Props {
  color: "green" | "blue" | "grey";
  provider: string;
  isLoading: boolean;
  onButtonClick: (provider: string) => Promise<void>;
}

const ProviderAuthButton = ({ color, provider, onButtonClick }: Props) => {
  const onClick = () => {
    onButtonClick(provider.toLowerCase());
  };
  return (
    <Button onClick={onClick} bg={color} size="l" w="100%">
      {provider}
    </Button>
  );
};

export default ProviderAuthButton;
