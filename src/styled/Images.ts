import styled from "styled-components/macro";

interface ImgProps {
  circle?: boolean;
}

export const ImgFluid = styled.img<ImgProps>`
  max-width: 100%;
  height: auto;
  border-radius: ${props => (props.circle ? "50%" : "0.25rem")};
`;

export const ImgThumbnail = styled.img<ImgProps>`
  padding: 0.25rem;
  background-color: ${props => props.theme.colors.bgMain};
  border: 1px solid ${props => props.theme.colors.grey};
  border-radius: ${props => (props.circle ? "50%" : "0.25rem")};
  max-width: 100%;
  height: auto;
`;

interface FigProps {
  size?: string;
  m?: string;
}

export const Figure = styled.figure<FigProps>`
  display: inline-block;
  width: ${props => props.size && props.size};
  height: ${props => props.size && props.size};
  margin: ${props => props.m && props.m};
  & > img:not(:last-child) {
    margin-bottom: 0.5rem;
    line-height: 1;
  }
  & > figcaption {
    font-size: 90%;
    color: ${props => props.theme.colors.textSec};
  }
`;

export const ImgFit = styled.img<ImgProps>`
  width: 100%;
  border: 1px solid ${props => props.theme.colors.grey};
  object-fit: cover;
  border-radius: ${props => (props.circle ? "50%" : "0.25rem")};
`;

export const FakeImage = styled.div<ImgProps>`
  vertical-align: middle;
  display: inline-block;
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.grey};
  border-radius: ${props => (props.circle ? "50%" : "0.25rem")};
  color: ${props => props.theme.colors.textMain};
  font-size: 14px;
`;
