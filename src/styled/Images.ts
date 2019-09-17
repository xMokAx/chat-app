import styled from "styled-components/macro";

export const ImgFluid = styled.img`
  max-width: 100%;
  height: auto;
`;

export const ImgThumbnail = styled.img`
  padding: 0.25rem;
  background-color: ${props => props.theme.colors.bgMain};
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: 0.25rem;
  max-width: 100%;
  height: auto;
`;

export const Figure = styled.figure`
  display: inline-block;
  & > img {
    margin-bottom: 0.5rem;
    line-height: 1;
  }
  & > figcaption {
    font-size: 90%;
    color: ${props => props.theme.colors.textSec};
  }
`;

export const ImgFit = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;
