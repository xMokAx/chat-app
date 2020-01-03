import styled from "styled-components/macro";

interface FlexConProps {
  column?: boolean;
  fullH?: boolean;
}

export const FlexContainer = styled.div<FlexConProps>`
  display: flex;
  flex-direction: ${props => props.column && "column"};
  justify-content: center;
  align-items: center;
  height: ${props => props.fullH && "100%"};
  & > :not(:last-child) {
    ${props => (props.column ? "margin-bottom" : "margin-right")}: 1rem;
  }
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-right: -16px;
  margin-left: -16px;
  height: 100%;
`;

interface ColProps {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  s?: boolean;
}

export const Col = styled.div<ColProps>`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding: 8px 16px;
  @media only screen and (min-width: ${props =>
      props.s ? "600px" : "1024px"}) {
    flex: ${props =>
      props.width ? `0 0 ${(props.width / 12) * 100}%` : "1 1 0"};
    max-width: ${props =>
      props.width ? `${(props.width / 12) * 100}%` : "100%"};
  }
`;
