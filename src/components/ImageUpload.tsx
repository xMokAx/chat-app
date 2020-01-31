import React, { useCallback, useState, useEffect } from "react";
import { useDropzone, DropzoneRootProps } from "react-dropzone";
import styled from "styled-components/macro";
import { cropToCanvas, canvasToImage } from "../utils/handleImage";
import { userApi } from "../firebase";
import ImageCrop from "./ImageCrop";
import Modal from "../styled/Modal";
import { FlexContainer, Row, Col } from "../styled/Flex";
import Button from "../styled/Button";
import { connect } from "react-redux";
import { userActions } from "../actions/user";
import { PercentCrop, Crop } from "react-image-crop";
import Canvas from "../styled/Canvas";
import Text from "../styled/Text";
import Loading from "../styled/Loading";

interface DispatchProps {
  updateUserPhoto: typeof userActions.updateUser;
}

interface OwnProps {
  id: string;
  toggleEditing: () => void;
}

type Props = OwnProps & DispatchProps;

const getColor = (props: DropzoneRootProps) => {
  if (props.isDragAccept) {
    return props.theme.colors.green;
  }
  if (props.isDragReject) {
    return props.theme.colors.red;
  }
  if (props.isDragActive) {
    return props.theme.colors.primary;
  }
  return props.theme.colors.grey;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  height: 200px;
  width: 200px;
  padding: 20px;
  border-width: 2px;
  border-radius: 2px;
  border-color: ${props => getColor(props)};
  border-style: dashed;
  background-color: ${props => props.theme.colors.bgSec};
  color: ${props => props.theme.colors.textSec};
  outline: none;
  transition: border 0.24s ease-in-out;
`;

const ImageUpload = ({ id, toggleEditing, updateUserPhoto }: Props) => {
  const [isUploading, setIsUploading] = useState(false);
  const [imgSrc, setImgSrc] = useState("");
  const [error, setError] = useState("");

  const onDropRejected = useCallback(rejectedimages => {
    const { type, size } = rejectedimages[0];
    let alert = "Please, make sure this file is:";
    if (!type.includes("image/")) {
      alert += "\n- an image.";
    }
    if (size > 500000) {
      alert += "\n- not more than 500kb.";
    }
    window.alert(alert);
  }, []);

  const onDropAccepted = useCallback((acceptedImages, e) => {
    URL.createObjectURL(acceptedImages[0]);
    setImgSrc(URL.createObjectURL(acceptedImages[0]));
  }, []);

  useEffect(
    () => () => {
      URL.revokeObjectURL(imgSrc);
    },
    [imgSrc]
  );

  const onComplete = useCallback((crop: Crop, percentCrop: PercentCrop) => {
    const canvas = document.getElementsByTagName("canvas")[0];
    const image = document.getElementsByClassName("ReactCrop__image")[0];
    cropToCanvas(canvas, image as HTMLImageElement, crop as Required<Crop>);
  }, []);

  const uploadImage = useCallback(async () => {
    const canvas = document.getElementsByTagName("canvas")[0];
    setError("");
    setIsUploading(true);

    try {
      const image = await canvasToImage(canvas);
      const uploadTaskSnapshot = await userApi.uploadImage(id, image!!);

      const downloadURL = await uploadTaskSnapshot.ref.getDownloadURL();
      await userApi.updateUser(id, {
        photo: downloadURL
      });
      updateUserPhoto({
        photo: downloadURL
      });
      toggleEditing();
    } catch (err) {
      setIsUploading(false);
      setError("Upload failed.");
    }
  }, [id, toggleEditing, updateUserPhoto]);

  const closeModal = useCallback(() => {
    if (!isUploading) {
      setImgSrc("");
    }
  }, [isUploading]);

  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragAccept,
    isDragReject
  } = useDropzone({
    accept: "image/*",
    multiple: false,
    maxSize: 500000,
    onDropAccepted,
    onDropRejected
  });

  return (
    <>
      <Container
        {...getRootProps({ isDragActive, isDragAccept, isDragReject })}
      >
        <input {...getInputProps()} />
        {isDragActive ? (
          <p>Drop the photo here ...</p>
        ) : (
          <p>Drag 'n' drop your photo, or click to select a photo</p>
        )}
        <p>Maximum image size: 500kb</p>
      </Container>
      <Modal isOpen={!!imgSrc} onRequestClose={closeModal}>
        <Row>
          <Col s>
            <FlexContainer column h="100%">
              {error ? (
                <Text color="red">{error}</Text>
              ) : isUploading ? (
                <>
                  <Loading />
                  <Text color="textSec">Uploading photo...</Text>
                </>
              ) : (
                <ImageCrop src={imgSrc} onComplete={onComplete} />
              )}
              {!isUploading && (
                <FlexContainer>
                  <Button bg="primary" onClick={uploadImage}>
                    {error ? "Retry" : "Upload"}
                  </Button>
                  <Button bg="red" onClick={toggleEditing}>
                    Cancel
                  </Button>
                </FlexContainer>
              )}
            </FlexContainer>
          </Col>
          <Col s>
            <p>Preview</p>
            <Canvas />
          </Col>
        </Row>
      </Modal>
    </>
  );
};

const mapDispatchToProps = {
  updateUserPhoto: userActions.updateUser
};

export default connect(
  null,
  mapDispatchToProps
)(ImageUpload);
