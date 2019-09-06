import styled from "styled-components/macro";

interface Props {
  isLeft?: boolean;
  isRight?: boolean;
}

export default styled.span<Props>`
  align-items: center;
  display: inline-flex;
  justify-content: center;
  left: ${props => props.isLeft && "0"};
  right: ${props => props.isRight && "0"};
`;
