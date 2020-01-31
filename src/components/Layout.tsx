import React, { useEffect, useState, createContext } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import Navigation from "./Navigation";
import Wrapper from "../styled/Wrapper";
import ErrorMessage from "../styled/ErrorMessage";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import Container from "../styled/Container";
import { useMediaQuery } from "react-responsive";

export const ConnectionContext = createContext({
  showConnectionStatus: false
});

interface StateProps {
  userError: string;
}

interface OwnProps {
  children: React.ReactNode;
}

type Props = StateProps & OwnProps;

const Layout = ({ children, userError }: Props) => {
  const [isOnline, setIsOnline] = useState(true);
  const [show, setShow] = useState(false);
  useEffect(() => {
    // to show the offline message when the website is in offline mode
    if (window.navigator.onLine === false) {
      setIsOnline(false);
      setShow(true);
    } else {
      setIsOnline(true);
    }

    const handleOfflineStatus = () => {
      setIsOnline(false);
      setShow(true);
    };

    // to show the offline message when the user loses connection
    window.addEventListener("offline", handleOfflineStatus);

    let timeout: number;
    const handleOnlineStatus = () => {
      setIsOnline(true);
      setShow(true);
      timeout = window.setTimeout(() => {
        setShow(false);
      }, 1500);
    };

    // to show the online message when the user is back online
    window.addEventListener("online", handleOnlineStatus);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("offline", handleOfflineStatus);
      window.removeEventListener("online", handleOnlineStatus);
    };
  }, []);
  const shouldIncreasePadding = useMediaQuery({
    query: "(max-width: 432px)"
  });

  let wrapperPaddingTop;
  if (show && userError) {
    if (shouldIncreasePadding) {
      wrapperPaddingTop = "96px";
    } else {
      wrapperPaddingTop = "72px";
    }
  } else if (userError && shouldIncreasePadding) {
    wrapperPaddingTop = "56px";
  } else if (show || userError) {
    wrapperPaddingTop = "32px";
  } else {
    wrapperPaddingTop = "0";
  }
  return (
    <Wrapper
      css={`
        padding-top: ${wrapperPaddingTop};
      `}
    >
      {show && (
        <ErrorMessage isOnline={isOnline}>
          {isOnline ? "You are back online" : "You are offline"}
        </ErrorMessage>
      )}
      {userError && <ErrorMessage>{userError}</ErrorMessage>}
      <Navigation />
      <ConnectionContext.Provider value={{ showConnectionStatus: show }}>
        <Container as="main">{children}</Container>
      </ConnectionContext.Provider>
    </Wrapper>
  );
};

const mapStateToProps = (state: AppState) => ({
  userError: state.user.error
});

export default connect(mapStateToProps)(Layout);
