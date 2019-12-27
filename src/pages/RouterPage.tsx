import React, { ReactElement } from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { BASE, APP } from "../constants/routes";
import { AppState } from "../store/configureStore";
import LoadingPage from "../styled/LoadingPage";

interface StateProps {
  userId: string;
  isLoadingUser: boolean;
}

type OwnProps = {
  path: string;
  exact?: boolean;
  publicRoute?: boolean;
  privateRoute?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children?: ReactElement;
};

type ExtendProps = OwnProps & StateProps;

const RouterPage = ({ children, exact, path, ...props }: ExtendProps) => {
  const { userId, isLoadingUser, publicRoute, privateRoute } = props;
  if (isLoadingUser) {
    return <LoadingPage />;
  }
  if (userId) {
    if (publicRoute) {
      return <Redirect to={APP} />;
    }
  } else {
    if (privateRoute) {
      return <Redirect to={BASE} />;
    }
  }

  return (
    <Route path={path} exact={exact}>
      {children}
    </Route>
  );
};

const mapStateToProps = (state: AppState) => ({
  isLoadingUser: state.user.isLoading,
  userId: state.user.userInfo.id
});

export default connect(mapStateToProps)(RouterPage);
