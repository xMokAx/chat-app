import React, { useState } from "react";
import { authApi } from "../firebase";
import { signInMethodsActions } from "../actions/signInMethods";
import LoadingButton from "./LoadingButton";
import Error from "../styled/Error";

interface Props {
  providerName: string;
  providerId: string;
  isLinked: boolean;
  onlyOneLinked: boolean;
  addMethod: typeof signInMethodsActions.addMethod;
  removeMethod: typeof signInMethodsActions.removeMethod;
  email?: string | null;
}

const ToggleLinkingProvider = ({
  providerName,
  providerId,
  addMethod,
  removeMethod,
  isLinked,
  onlyOneLinked
}: Props) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const onLink = async () => {
    setIsLoading(true);
    setError("");
    try {
      await authApi.linkProvider(providerName);
      addMethod(providerId);
      setError("");
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };
  const onUnlink = async () => {
    setError("");
    setIsLoading(true);
    try {
      await authApi.unlinkProvider(providerId);
      removeMethod(providerId);
      setError("");
      setIsLoading(false);
    } catch (e) {
      setError(e.message);
      setIsLoading(false);
    }
  };
  return (
    <div>
      {error && <Error>{error}</Error>}
      {isLinked ? (
        <LoadingButton
          w="100%"
          type="button"
          bg="red"
          onClick={onUnlink}
          isLoading={isLoading}
          disabled={onlyOneLinked}
        >
          Unlink {providerName}
        </LoadingButton>
      ) : (
        <LoadingButton
          w="100%"
          type="button"
          bg="green"
          onClick={onLink}
          isLoading={isLoading}
        >
          Link {providerName}
        </LoadingButton>
      )}
    </div>
  );
};

export default ToggleLinkingProvider;
