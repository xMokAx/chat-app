import React, { useState, Fragment, createContext, useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import webFont from "webfontloader";
import * as ROUTES from "./constants/routes";
import { ThemeProvider } from "styled-components/macro";
import { lightTheme } from "./themes/light";
import { darkTheme } from "./themes/dark";
import { ModalProvider } from "styled-react-modal";
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

export const IconFontContext = createContext({
  iconFontLoaded: false
});

const App = () => {
  const [iconFontLoaded, setIconFontLoaded] = useState(false);

  useEffect(() => {
    console.log("App is mounted");
    // load fonts when app first mounts
    webFont.load({
      fontactive: function(familyName, fvd) {
        if (familyName === "Material Icons") {
          setIconFontLoaded(true);
        }
        console.log("rendered", familyName, fvd);
      },
      google: {
        families: ["Material Icons", "Roboto:400,500,700", "&display=swap"]
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
          <IconFontContext.Provider value={{ iconFontLoaded }}>
            <ModalProvider>
              <Router>
                <Layout>
                  <Switch>
                    <RouterPage path={ROUTES.BASE} exact publicRoute>
                      <LandingPage />
                    </RouterPage>
                    <RouterPage path={ROUTES.SIGN_UP} exact publicRoute>
                      <SignUpPage />
                    </RouterPage>
                    <RouterPage path={ROUTES.SIGN_UP_EMAIL} publicRoute>
                      <SignUpEmailPage />
                    </RouterPage>
                    <RouterPage path={ROUTES.SIGN_IN} exact publicRoute>
                      <SignInPage />
                    </RouterPage>
                    <RouterPage path={ROUTES.SIGN_IN_EMAIL} publicRoute>
                      <SignInEmailPage />
                    </RouterPage>
                    <RouterPage path={ROUTES.PASSWORD_FORGET}>
                      <PasswordForgetPage />
                    </RouterPage>
                    <RouterPage path={ROUTES.APP} exact privateRoute>
                      <ChatPage />
                    </RouterPage>
                    <RouterPage path={ROUTES.ACCOUNT} privateRoute>
                      <AccountPage>
                        <Switch>
                          <RouterPage path={ROUTES.PROFILE} exact privateRoute>
                            <ProfilePage />
                          </RouterPage>
                          <RouterPage
                            path={ROUTES.ACCOUNT + ROUTES.PASSWORD_CHANGE}
                            privateRoute
                          >
                            <PasswordChangePage />
                          </RouterPage>
                          <RouterPage
                            path={ROUTES.ACCOUNT + ROUTES.PASSWORD_FORGET}
                            privateRoute
                          >
                            <PasswordForgetPage />
                          </RouterPage>
                          <Route>
                            <NotFoundPage />
                          </Route>
                        </Switch>
                      </AccountPage>
                    </RouterPage>
                    <Route>
                      <NotFoundPage />
                    </Route>
                  </Switch>
                </Layout>
              </Router>
            </ModalProvider>
          </IconFontContext.Provider>
        </ThemeContext.Provider>
      </Fragment>
    </ThemeProvider>
  );
};

export default App;
