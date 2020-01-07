import styled from "styled-components";
import ReactCrop from "react-image-crop";

export default styled(ReactCrop)`
  & .ReactCrop__crop-selection {
    border-width: 2px;
  }
  & .ReactCrop__image {
    max-width: 200px;
    max-height: 200px;
    object-fit: cover;
    border-radius: 0.25rem;
  }
`;
