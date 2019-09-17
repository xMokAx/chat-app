import styled from "styled-components/macro";

export default styled.div`
  flex: 1;
  display: flex;
  width: 100%;
  max-width: 400px;
  height: fit-content;
  flex-direction: column;
  align-items: center;
  text-align: center;
  margin-left: auto;
  margin-right: auto;
  & > * {
    width: 100%;
    margin-bottom: 1rem;
  }
`;
