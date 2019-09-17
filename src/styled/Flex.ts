import styled from "styled-components/macro";

export const FlexContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  & > :not(:last-child) {
    margin-right: 0.5rem;
  }
`;

export const Row = styled.div`
  display: flex;
  flex: 1;
  flex-wrap: wrap;
  margin-right: -15px;
  margin-left: -15px;
`;

interface ColProps {
  width?: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
}

export const Col = styled.div<ColProps>`
  flex: 0 0 100%;
  max-width: 100%;
  position: relative;
  width: 100%;
  padding-right: 15px;
  padding-left: 15px;
  @media only screen and (min-width: 1024px) {
    flex: ${props =>
      props.width ? `0 0 ${(props.width / 12) * 100}%` : "1 1 0"};
    max-width: ${props =>
      props.width ? `${(props.width / 12) * 100}%` : "100%"};
  }
`;
