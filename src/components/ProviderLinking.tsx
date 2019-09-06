import React, { Fragment } from "react";
import ToggleLinkingProvider from "./ToggleLinkingProvider";
import ToggleLinkingEmail from "./ToggleLinkingEmail";
import withSignInMethods, { WithSignInMethodsProps } from "./withSignInMethods";
import Card from "../styled/Card";
import Loading from "../styled/Loading";
import Button from "../styled/Button";

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
    <Card>
      <h2>Link sign in methods</h2>
      <Fragment>
        {isLoading ? (
          <Loading />
        ) : (
          <Fragment>
            {error ? (
              <div>
                <p>{error}</p>
                <Button
                  onClick={async () => {
                    getMethodsStart(email);
                  }}
                >
                  Try again
                </Button>
              </div>
            ) : (
              <Fragment>
                {SIGN_IN_METHODS.map(method => {
                  const isLinked = signInMethods.includes(method.id);
                  const onlyOneLinked = signInMethods.length === 1;
                  return (
                    <Fragment key={method.name}>
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
                    </Fragment>
                  );
                })}
              </Fragment>
            )}
          </Fragment>
        )}
      </Fragment>

      <p>{JSON.stringify(signInMethods, null, 2)}</p>
    </Card>
  );
};

export default withSignInMethods(ProviderLinking);
