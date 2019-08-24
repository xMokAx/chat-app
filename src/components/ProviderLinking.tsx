import React, { Fragment } from "react";
import ToggleLinkingProvider from "./ToggleLinkingProvider";
import ToggleLinkingEmail from "./ToggleLinkingEmail";
import withSignInMethods, { WithSignInMethodsProps } from "./withSignInMethods";

const SIGN_IN_METHODS = [
  {
    name: "password",
    id: "password"
  },
  {
    name: "google",
    id: "google.com"
  },
  {
    name: "facebook",
    id: "facebook.com"
  },
  {
    name: "github",
    id: "github.com"
  }
];

const ProviderLinking = ({
  email,
  getMethodsStart,
  addMethod,
  removeMethod,
  isLoading,
  signInMethods,
  error
}: WithSignInMethodsProps) => {
  return (
    <div>
      <h2>Link Social Accounts</h2>
      <div>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          <Fragment>
            {error ? (
              <div>
                <p>{error}</p>
                <button
                  onClick={async () => {
                    getMethodsStart(email);
                  }}
                >
                  Try again
                </button>
              </div>
            ) : (
              <ul>
                {SIGN_IN_METHODS.map(method => {
                  const isLinked = signInMethods.includes(method.id);
                  const onlyOneLinked = signInMethods.length === 1;
                  return (
                    <li key={method.name}>
                      {method.id === "password" ? (
                        <ToggleLinkingEmail
                          onlyOneLinked={onlyOneLinked}
                          providerName={method.name}
                          addMethod={addMethod}
                          removeMethod={removeMethod}
                          isLinked={isLinked}
                          providerId={method.id}
                          email={email}
                        />
                      ) : (
                        <ToggleLinkingProvider
                          onlyOneLinked={onlyOneLinked}
                          providerName={method.name}
                          addMethod={addMethod}
                          removeMethod={removeMethod}
                          isLinked={isLinked}
                          providerId={method.id}
                          email={email}
                        />
                      )}
                    </li>
                  );
                })}
              </ul>
            )}
          </Fragment>
        )}
      </div>

      <p>{JSON.stringify(signInMethods, null, 2)}</p>
    </div>
  );
};

export default withSignInMethods(ProviderLinking);
