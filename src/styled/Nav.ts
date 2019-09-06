import styled from "styled-components/macro";

export default styled.nav`
  display: flex;
  justify-content: center;
  margin-bottom: 1rem;
  border-bottom: 1px solid ${props => props.theme.colors.bgSec};
`;
