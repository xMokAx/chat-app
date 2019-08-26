import styled from "styled-components/macro";

export default styled.div`
  background-color: ${props => props.theme.colors.bgSec};
  flex: 1;
  display: flex;
  max-width: 400px;
  height: fit-content;
  padding: 2rem;
  border-radius: 0.5rem;
  flex-direction: column;
  align-items: center;
  text-align: center;
  & > * {
    width: 100%;
    margin: 0.5rem 0;
  }
`;
