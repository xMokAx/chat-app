import styled from "styled-components/macro";

interface Props {
  expandedChildren?: boolean;
}

export default styled.div<Props>`
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
    margin-bottom: 1rem;
    width: ${props => props.expandedChildren && "100%"};
  }
`;
