import React, { ReactNode, ComponentType } from "react";
import { connect } from "react-redux";
import { RouteComponentProps, Redirect } from "@reach/router";
import { BASE, APP } from "../constants/routes";
import { AppState } from "../store/configureStore";
import LoadingPage from "../styled/LoadingPage";

interface StateProps {
  userId: string;
  isLoadingUser: boolean;
}

type OwnProps = {
  publicRoute?: boolean;
  privateRoute?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  PageComonent: ComponentType<any>;
  children?: ReactNode;
} & RouteComponentProps;

type ExtendProps = OwnProps & StateProps;

const RouterPage = ({ children, ...props }: ExtendProps) => {
  const { userId, isLoadingUser, publicRoute, privateRoute } = props;
  if (isLoadingUser) {
    return <LoadingPage />;
  }
  if (userId) {
    if (publicRoute) {
      return <Redirect to={APP} noThrow />;
    }
  } else {
    if (privateRoute) {
      return <Redirect to={BASE} noThrow />;
    }
  }

  const { ...others }: RouteComponentProps = props;
  return <props.PageComonent {...others}>{children}</props.PageComonent>;
};

const mapStateToProps = (state: AppState) => ({
  isLoadingUser: state.user.isLoading,
  userId: state.user.userInfo.id
});

export default connect(mapStateToProps)(RouterPage);
