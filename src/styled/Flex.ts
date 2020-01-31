import styled from "styled-components/macro";
import { JustifyContentProperty } from "csstype";

interface FlexConProps {
  column?: boolean;
  h?: string;
  justify?: JustifyContentProperty;
  p?: string;
  m?: string;
  wr?: boolean;
}

export const FlexContainer = styled.div<FlexConProps>`
  display: flex;
  flex-direction: ${props => props.column && "column"};
  flex-wrap: ${props => (props.wr ? "wrap" : "no-wrap")};
  justify-content: ${props => (props.justify ? props.justify : "center")};
  align-items: center;
  padding: ${props => props.p && props.p};
  margin: ${props => props.m && props.m};
  height: ${props => props.h && props.h};
  & > :not(:last-child) {
    ${props =>
      props.wr
        ? "margin: 0"
        : props.column
        ? "margin-bottom"
        : "margin-right"}: 1rem;
  }
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin-right: -16px;
  margin-left: -16px;
`;

interface ColProps {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  s?: boolean;
  largeOnly?: boolean;
}

export const Col = styled.div<ColProps>`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding: 8px 16px;
  @media only screen and (max-width: 1023px) {
    display: ${props => props.largeOnly && "none"};
  }
  @media only screen and (min-width: ${props =>
      props.s ? "600px" : "1024px"}) {
    flex: ${props =>
      props.width ? `0 0 ${(props.width / 12) * 100}%` : "1 1 0"};
    max-width: ${props =>
      props.width ? `${(props.width / 12) * 100}%` : "100%"};
  }
`;
