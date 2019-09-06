import styled from "styled-components/macro";
import { rgba, lighten, darken } from "polished";

export default styled.input.attrs({
  autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "none",
  spellCheck: false
})`
  display: block;
  width: 100%;
  height: 2.5rem;
  padding: 0.375rem 0.75rem;
  line-height: 1.5;
  color: ${props => props.theme.colors.textMain};
  background-color: ${props => props.theme.colors.bgSec};
  background-clip: padding-box;
  border: 1px solid
    ${props =>
      props.theme.isDarkMode
        ? lighten(0.2, props.theme.colors.bgSec)
        : darken(0.2, props.theme.colors.bgSec)};
  border-radius: 0.25rem;
  transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${props => rgba(props.theme.colors.primary, 0.25)};
  }
  &::placeholder {
    color: ${props => props.theme.colors.textSec};
  }
`;
