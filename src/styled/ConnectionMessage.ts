import styled from "styled-components/macro";

interface ConnectionMessageProps {
  isOnline: boolean;
}

export default styled.div<ConnectionMessageProps>`
  top: 0;
  left: 0;
  position: absolute;
  width: 100%;
  height: "24px";
  z-index: 999;
  background-color: ${props => (props.isOnline ? "green" : "red")};
  text-align: center;
`;
