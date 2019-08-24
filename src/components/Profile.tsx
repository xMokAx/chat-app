import React from "react";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import ProviderLinking from "./ProviderLinking";
import { User } from "../actions/user";

type Props = {
  userInfo: User;
};

const Profile = ({ userInfo }: Props) => (
  <div>
    <h1>Profile</h1>
    {userInfo.photo ? (
      <figure style={{ width: "128px", height: "128px" }}>
        <img
          style={{ objectFit: "cover", width: "128px", height: "128px" }}
          src={userInfo.photo}
          alt={`${userInfo.name}`}
        />
      </figure>
    ) : (
      <div
        style={{ width: "128px", height: "128px", backgroundColor: "grey" }}
      />
    )}
    <p>{userInfo.name}</p>
    <p>{userInfo.email}</p>
    {userInfo.email && <ProviderLinking email={userInfo.email} />}
  </div>
);

const mapStateToProps = (state: AppState) => ({
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps)(Profile);
