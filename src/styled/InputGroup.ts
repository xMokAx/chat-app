import styled from "styled-components/macro";

interface Props {
  hasIconLeft?: boolean;
  hasIconRight?: boolean;
}

export default styled.div<Props>`
  position: relative;
  display: flex;
  & > input {
    padding-left: ${props => props.hasIconLeft && "40px"};
    padding-right: ${props => props.hasIconRight && "40px"};
  }
  & > input:focus ~ span {
    color: ${props => props.theme.colors.textMain};
  }
  & > span,
  > button {
    position: absolute;
    width: 40px;
    height: 40px;
    padding: 0;
    top: 0;
  }
  & > span {
    color: ${props => props.theme.colors.textSec};
  }
  & > button:focus {
    border: 1px solid ${props => props.theme.colors.primary};
  }
`;
