import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import ProviderLinking from "../components/ProviderLinking";
import { User } from "../actions/user";
import { Row, Col } from "../styled/Flex";
import Card from "../styled/Card";
import EditUserName from "../components/EditUserName";
import EditEmail from "../components/EditEmail";
import ProfileImage from "../components/ProfileImage";

type Props = {
  userInfo: User;
};

const Profile = ({ userInfo: { id, email, name, photo } }: Props) => (
  <>
    <Row>
      <Col
        width={12}
        css={`
          text-align: center;
        `}
      >
        <h1>Profile</h1>
      </Col>
      <Col>
        <Card>
          <ProfileImage name={name!!} email={email!!} photo={photo} id={id} />
          <EditUserName id={id} userName={name!!} />
          <EditEmail id={id} email={email!!} />
        </Card>
      </Col>
      <Col>{email && <ProviderLinking email={email} />}</Col>
    </Row>
  </>
);

const mapStateToProps = (state: AppState) => ({
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps)(Profile);
