import styled from "styled-components/macro";

export default styled.nav`
  display: flex;
  border: 0;
  justify-content: center;
  align-items: center;
  padding: 0 16px;
  border-bottom-width: 1px;
  border-color: ${props => props.theme.colors.bgSec};
  border-style: solid;
  &:not(:first-child) {
    border-top-width: 1px;
  }
`;
