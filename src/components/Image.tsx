import React, { useState, Fragment } from "react";
import styled from "styled-components/macro";
import Loading from "../styled/Loading";
import { ImgFluid, ImgThumbnail, ImgFit } from "../styled/Images";
import { FlexContainer } from "../styled/Flex";

const images = {
  fluid: ImgFluid,
  thumbnail: ImgThumbnail,
  fit: ImgFit
};

interface Props {
  src: string;
  alt: string;
  type: keyof typeof images;
}

const Image = ({ src, alt, type }: Props) => {
  const Img = images[type];
  const [isLoading, setIsLoading] = useState(true);
  const onImageLoad = () => setIsLoading(!isLoading);
  return (
    <Fragment>
      {isLoading && (
        <FlexContainer
          css={`
            height: 100%;
          `}
        >
          <Loading />
        </FlexContainer>
      )}
      <Img
        // using css prop here causes error ReferenceError: Img is not defined
        style={{ display: isLoading ? "none" : "" }}
        src={src}
        alt={alt}
        onLoad={onImageLoad}
      />
    </Fragment>
  );
};

export default Image;
