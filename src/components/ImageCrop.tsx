import React, { useState } from "react";
import { Crop, ReactCropProps } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import StyledCrop from "../styled/StyledCrop";

type Props = Omit<ReactCropProps, "crop" | "onChange">;

const ImageCrop = ({ src, onComplete }: Props) => {
  const [crop, setCrop] = useState<Crop>({ aspect: 1, width: 256 });
  return (
    <StyledCrop
      src={src}
      crop={crop}
      onComplete={onComplete}
      onChange={newCrop => {
        setCrop(newCrop);
      }}
    />
  );
};

export default ImageCrop;
