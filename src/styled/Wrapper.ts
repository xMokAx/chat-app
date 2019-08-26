import styled from "styled-components";

interface Props {
  show: boolean;
}

export default styled.div<Props>`
  padding: 1rem;
  padding-top: ${props => (props.show ? "24px" : 0)};
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
`;
