import styled from "styled-components/macro";
import { rgba, lighten, darken } from "polished";

export default styled.input.attrs({
  // autoComplete: "off",
  autoCorrect: "off",
  autoCapitalize: "none",
  spellCheck: false
})`
  display: inline-flex;
  justify-content: flex-start;
  width: 100%;
  max-width: 100%;
  overflow: hidden;
  text-overflow: ellipsis;
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
  &:hover {
    border-color: ${props => props.theme.colors.textMain};
  }
  &:focus {
    border-color: ${props => props.theme.colors.primary};
    outline: 0;
    box-shadow: 0 0 0 0.2rem ${props => rgba(props.theme.colors.primary, 0.25)};
  }
  &::placeholder {
    color: ${props => props.theme.colors.grey};
  }
`;
