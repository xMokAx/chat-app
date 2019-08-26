import React, { useState, Fragment, createContext } from "react";
import { Router } from "@reach/router";
import * as ROUTES from "./constants/routes";
import { ThemeProvider } from "styled-components/macro";
import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";
import Layout from "./components/Layout";
import LandingPage from "./components/LandingPage";
import SignUpPage from "./components/SignUpPage";
import SignUpEmailPage from "./components/SignUpEmailPage";
import SignInPage from "./components/SignInPage";
import SignInEmailPage from "./components/SignInEmailPage";
import PasswordForgetPage from "./components/PasswordForgetPage";
import ChatPage from "./components/ChatPage";
import AccountPage from "./components/AccountPage";
import Profile from "./components/Profile";
import PasswordChangeForm from "./components/PasswordChangeForm";
import PasswordForgetForm from "./components/PasswordForgetForm";
import RouterPage from "./components/RouterPage";
import NotFoundPage from "./components/NotFoundPage";
import GlobalStyle from "./styled/GlobalStyle";

export const ThemeContext = createContext({
  isDarkMode: false,
  toggleTheme: () => {}
});

const App = () => {
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
                  PageComonent={Profile}
                  privateRoute
                />
                <RouterPage
                  path={ROUTES.PASSWORD_CHANGE}
                  PageComonent={PasswordChangeForm}
                  privateRoute
                />
                <RouterPage
                  path={ROUTES.PASSWORD_FORGET}
                  PageComonent={PasswordForgetForm}
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
