import React, { useState } from "react";
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import styled from "styled-components/macro";
import { Figure } from "../styled/Images";
import Image from "../components/Image";
import Button from "../styled/Button";
import Icon from "../styled/Icon";
import UploadImage from "./ImageUpload";
import Card from "../styled/Card";

interface Props {
  photo: string;
  name: string;
  email: string;
  id: string;
}

const ProfileImage = ({ photo, name, id }: Props) => {
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
        size="200px"
        css={`
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
        <Image type="fit" src={photo} alt={`${name}`} />
      </Figure>
    </div>
  );
};

export default ProfileImage;
