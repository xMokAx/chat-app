import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import { createHash } from "crypto";
import { Figure } from "../styled/Images";
import Image from "../components/Image";
import Button from "../styled/Button";
import Icon from "../styled/Icon";
import UploadImage from "./ImageUpload";
import Card from "../styled/Card";

const emailHash = (email: string) =>
  createHash("md5")
    .update(email)
    .digest("hex");

interface Props {
  photo?: string | null;
  name: string;
  email: string;
  id: string;
}

const ProfileImage = ({ photo, name, email, id }: Props) => {
  const [isEditing, setIsEditing] = useState(false);
  const toggleEditing = () => {
    setIsEditing(!isEditing);
  };
  if (isEditing) {
    return (
      <Card>
        <UploadImage id={id} toggleEditing={toggleEditing} />
        <Button bg="red" onClick={toggleEditing}>
          Cancel
        </Button>
      </Card>
    );
  }

  return (
    <div>
      <Figure
        css={`
          height: 256px;
          width: 256px;
          position: relative;
        `}
      >
        <Button
          css={`
            position: absolute;
            bottom: 4px;
            right: 4px;
          `}
          bg="primary"
          circle
          aria-label="Edit user name"
          size="s"
          onClick={toggleEditing}
        >
          <Icon icon="edit"></Icon>
        </Button>
        <Image
          type="fit"
          src={
            photo
              ? photo
              : `https://www.gravatar.com/avatar/${emailHash(
                  email
                )}?s=400&r=pg&d=identicon`
          }
          alt={`${name}`}
        />
      </Figure>
    </div>
  );
};

export default ProfileImage;
