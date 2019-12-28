import React from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import { connect } from "react-redux";
import { AppState } from "../store/configureStore";
import { createHash } from "crypto";
import ProviderLinking from "../components/ProviderLinking";
import { User } from "../actions/user";
import { Row, Col } from "../styled/Flex";
import Card from "../styled/Card";
import EditUserName from "../components/EditUserName";
import EditEmail from "../components/EditEmail";
import { Figure } from "../styled/Images";
import Image from "../components/Image";

const emailHash = (email: string) =>
  createHash("md5")
    .update(email)
    .digest("hex");

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
          margin-bottom: 16px;
        `}
      >
        <h1>Profile</h1>
      </Col>
      <Col>
        <Card>
          <div>
            <Figure
              css={`
                height: 256px;
                width: 256px;
              `}
            >
              <Image
                type="fit"
                src={
                  photo
                    ? photo
                    : `https://www.gravatar.com/avatar/${emailHash(
                        email!!
                      )}?s=400&r=pg&d=identicon`
                }
                alt={`${name}`}
              />
              <figcaption>{name} profile photo</figcaption>
            </Figure>
          </div>
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
