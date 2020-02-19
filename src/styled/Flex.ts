import styled from "styled-components/macro";

interface FlexConProps {
  column?: boolean;
  h?: string;
  justify?: string;
  p?: string;
  m?: string;
  wr?: boolean;
  childrenM?: string;
  align?: string;
}

export const FlexContainer = styled.div<FlexConProps>`
  display: flex;
  flex-direction: ${props => props.column && "column"};
  flex-wrap: ${props => (props.wr ? "wrap" : "nowrap")};
  justify-content: ${props => (props.justify ? props.justify : "center")};
  align-items: ${props => (props.align ? props.align : "center")};
  padding: ${props => props.p && props.p};
  margin: ${props => props.m && props.m};
  height: ${props => props.h && props.h};
  & > :not(:last-child) {
    ${props =>
      props.wr
        ? "margin: 0"
        : props.column
        ? "margin-bottom"
        : "margin-right"}: ${props =>
      props.childrenM ? props.childrenM : "1rem"};
  }
`;

interface RowProps {
  isMobile?: boolean;
}

export const Row = styled.div<RowProps>`
  display: flex;
  flex-wrap: ${props => (props.isMobile ? "nowrap" : "wrap")};
  margin-right: -16px;
  margin-left: -16px;
`;

interface ColProps {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  break?: string;
  hiddenBreak?: string;
  p?: string;
}

export const Col = styled.div<ColProps>`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding: ${props => (props.p ? props.p : "8px 16px")};
  ${props =>
    props.hiddenBreak &&
    `@media only screen and (max-width: ${props.hiddenBreak}) {
      display: none;
    }`}
  @media only screen and (min-width: ${props =>
    props.break ? props.break : "1024px"}) {
    flex: ${props =>
      props.width ? `0 0 ${(props.width / 12) * 100}%` : "1 1 0"};
    max-width: ${props =>
      props.width ? `${(props.width / 12) * 100}%` : "100%"};
  }
`;
