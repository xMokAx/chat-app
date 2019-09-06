import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import ProviderLinking from "../components/ProviderLinking";
import { User } from "../actions/user";
import { Row, Col, FlexContainer } from "../styled/Flex";
import Card from "../styled/Card";
import Icon from "../styled/Icon";
import { createHash } from "crypto";

const emailHash = (email: string) =>
  createHash("md5")
    .update(email)
    .digest("hex");

type Props = {
  userInfo: User;
};

const Profile = ({ userInfo }: Props) => (
  <Row>
    <Col
      width={12}
      css={`
        text-align: center;
        margin-bottom: 16px;
      `}
    >
      <h1>Profile</h1>
    </Col>
    <Col>
      <Card>
        <figure style={{ width: "200px", height: "200px" }}>
          <img
            style={{ objectFit: "cover", width: "100%", height: "100%" }}
            src={
              userInfo.photo
                ? userInfo.photo
                : `https://www.gravatar.com/avatar/${emailHash(
                    userInfo.email!!
                  )}?s=400&r=pg&d=identicon`
            }
            alt={`${userInfo.name}`}
          />
        </figure>
        <FlexContainer as="h2">
          <Icon css="margin-right: 8px;">
            <i className="material-icons">person</i>
          </Icon>
          {userInfo.name}
        </FlexContainer>
        <FlexContainer as="p">
          <Icon css="margin-right: 8px;">
            <i className="material-icons">email</i>
          </Icon>
          {userInfo.email}
        </FlexContainer>
      </Card>
    </Col>
    <Col>{userInfo.email && <ProviderLinking email={userInfo.email} />}</Col>
  </Row>
);

const mapStateToProps = (state: AppState) => ({
  userInfo: state.user.userInfo
});

export default connect(mapStateToProps)(Profile);
