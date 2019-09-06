import React, { useState, Fragment, createContext, useEffect } from "react";
import { Router } from "@reach/router";
import webFont from "webfontloader";
import * as ROUTES from "./constants/routes";
import { ThemeProvider } from "styled-components/macro";
import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";
import Layout from "./components/Layout";
import LandingPage from "./pages/LandingPage";
import SignUpPage from "./pages/SignUpPage";
import SignUpEmailPage from "./pages/SignUpEmailPage";
import SignInPage from "./pages/SignInPage";
import SignInEmailPage from "./pages/SignInEmailPage";
import ChatPage from "./pages/ChatPage";
import AccountPage from "./pages/AccountPage";
import ProfilePage from "./pages/ProfilePage";
import PasswordChangePage from "./pages/PasswordChangePage";
import PasswordForgetPage from "./pages/PasswordForgetPage";
import RouterPage from "./pages/RouterPage";
import NotFoundPage from "./pages/NotFoundPage";
import GlobalStyle from "./styled/GlobalStyle";

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

const App = () => {
  useEffect(() => {
    console.log("App is mounted");
    // load fonts when app first mounts
    webFont.load({
      google: {
        families: ["Roboto:400,500,700", "Material Icons&display=swap"]
      }
    });
  }, []);
  const stored = localStorage.getItem("isDarkMode");
  const [isDarkMode, setIsDarkMode] = useState(
    stored === "true" ? true : false
  );
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    localStorage.setItem("isDarkMode", `${!isDarkMode}`);
  };
  return (
    <ThemeProvider theme={isDarkMode ? darkTheme : lightTheme}>
      <Fragment>
        <GlobalStyle />
        <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
          <Router>
            <RouterPage path={ROUTES.BASE} PageComonent={Layout}>
              <RouterPage
                path={ROUTES.BASE}
                PageComonent={LandingPage}
                publicRoute
              />
              <RouterPage
                path={ROUTES.SIGN_UP}
                PageComonent={SignUpPage}
                publicRoute
              />
              <RouterPage
                path={ROUTES.SIGN_UP_EMAIL}
                PageComonent={SignUpEmailPage}
                publicRoute
              />
              <RouterPage
                path={ROUTES.SIGN_IN}
                PageComonent={SignInPage}
                publicRoute
              />
              <RouterPage
                path={ROUTES.SIGN_IN_EMAIL}
                PageComonent={SignInEmailPage}
                publicRoute
              />
              <RouterPage
                path={ROUTES.PASSWORD_FORGET}
                PageComonent={PasswordForgetPage}
              />
              <RouterPage
                path={ROUTES.APP}
                PageComonent={ChatPage}
                privateRoute
              />
              <RouterPage
                path={ROUTES.ACCOUNT}
                PageComonent={AccountPage}
                privateRoute
              >
                <RouterPage
                  path={ROUTES.PROFILE}
                  PageComonent={ProfilePage}
                  privateRoute
                />
                <RouterPage
                  path={ROUTES.PASSWORD_CHANGE}
                  PageComonent={PasswordChangePage}
                  privateRoute
                />
                <RouterPage
                  path={ROUTES.PASSWORD_FORGET}
                  PageComonent={PasswordForgetPage}
                  privateRoute
                />
              </RouterPage>
              <RouterPage PageComonent={NotFoundPage} default />
            </RouterPage>
          </Router>
        </ThemeContext.Provider>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
