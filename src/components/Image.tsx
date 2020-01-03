import React, { useState, useCallback } from "react";
import { DefaultTheme } from "styled-components/macro";
import Loading from "../styled/Loading";
import { ImgFluid, ImgThumbnail, ImgFit } from "../styled/Images";
import Button from "../styled/Button";
import Card from "../styled/Card";
import Text from "../styled/Text";

const images = {
  fluid: ImgFluid,
  thumbnail: ImgThumbnail,
  fit: ImgFit
};

interface Props {
  src: string;
  alt: string;
  type: keyof typeof images;
  small?: boolean;
}

const Image = ({ src, alt, type, small = false }: Props) => {
  const Img = images[type];
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");
  const onImageLoad = useCallback(() => {
    setError("");
    setIsLoading(!isLoading);
  }, [isLoading]);

  const onImageError = useCallback(() => {
    setIsLoading(false);
    setError("Loading image failed");
  }, []);

  const onImageRetry = useCallback(() => {
    onImageLoad();
    setImgSrc(src + "&" + Date.now());
  }, [onImageLoad, src]);

  const textSize = small ? "12px" : "inherit";
  const buttonSize = small ? "s" : undefined;

  return (
    <>
      {error || isLoading ? (
        <Card
          css={`
            height: 100%;
            justify-content: center;
            border: 1px solid
              ${(props: { theme: DefaultTheme }) => props.theme.colors.grey};
          `}
        >
          {error && (
            <>
              <Text color="red" size={textSize}>
                {error}
              </Text>
              <Button bg="primary" size={buttonSize} onClick={onImageRetry}>
                Retry
              </Button>
            </>
          )}
          {isLoading && <Loading small={small} />}
        </Card>
      ) : null}

      <Img
        // using css prop here causes error ReferenceError: Img is not defined
        style={{ display: isLoading || error ? "none" : "" }}
        src={imgSrc}
        alt={alt}
        onLoad={onImageLoad}
        onError={onImageError}
      />
    </>
  );
};

export default Image;
