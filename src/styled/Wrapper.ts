import styled from "styled-components";

interface Props {
  minH?: string;
}

export default styled.div<Props>`
  height: 100%;
  min-height: ${props => (props.minH ? props.minH : "100vh")};
  width: 100%;
  display: flex;
  flex-direction: column;
`;
