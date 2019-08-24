import React from "react";

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
    <div>
      <button onClick={onClick} disabled={isLoading}>
        {provider}
      </button>
    </div>
  );
};

export default ProviderAuthButton;
