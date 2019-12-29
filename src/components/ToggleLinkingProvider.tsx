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
      const response = await authApi.linkProvider(providerName);
      console.log(response);
      addMethod(providerId);
      setError("");
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.message);
      setIsLoading(false);
    }
  };
  const onUnlink = async () => {
    setError("");
    setIsLoading(true);
    try {
      const response = await authApi.unlinkProvider(providerId);
      console.log(response);
      removeMethod(providerId);
      setError("");
      setIsLoading(false);
    } catch (e) {
      console.log(e);
      setError(e.message);
      setIsLoading(false);
    }
  };
  return (
    <div>
      {error && <Error>{error}</Error>}
      {isLinked ? (
        <LoadingButton
          expanded
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
          expanded
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
