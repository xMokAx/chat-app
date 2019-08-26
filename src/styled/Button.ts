import styled from "styled-components/macro";
import { lighten, darken } from "polished";

interface Props {
  primary?: boolean;
  large?: boolean;
}

export default styled.button<Props>`
  cursor: pointer;
  border: none;
  text-align: center;
  text-transform: capitalize;
  background: ${props =>
    props.primary ? props.theme.colors.primary : props.theme.colors.bgSec};
  color: ${props => props.theme.colors.textMain};
  padding: ${props => (props.large ? "0.5rem 1rem" : "0.5rem")};
  font-size: ${props => (props.large ? "1.5rem" : "1rem")};
  line-height: 1.5;
  border-radius: 0.25rem;
  &:hover,
  &:focus {
    color: ${props => props.theme.colors.textMain};
    background: ${props =>
      props.primary
        ? props.theme.isDarkMode
          ? darken(0.1, props.theme.colors.primary)
          : lighten(0.1, props.theme.colors.primary)
        : props.theme.isDarkMode
        ? darken(0.1, props.theme.colors.bgSec)
        : lighten(0.1, props.theme.colors.bgSec)};
    text-decoration: none;
  }
`;
