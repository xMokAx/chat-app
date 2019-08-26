import styled from "styled-components/macro";
import { Link } from "@reach/router";
import { lighten, darken } from "polished";

export default styled(Link)`
  display: block;
  padding: 1rem 0.75rem;
  &:first-child {
    padding-left: 0;
  }
  &:hover,
  &:focus {
    text-decoration: none;
  }
  &[aria-current] {
    color: ${props => props.theme.colors.primary};
    &:hover {
      color: ${props =>
        props.theme.isDarkMode
          ? lighten(0.1, props.theme.colors.primary)
          : darken(0.1, props.theme.colors.primary)};
    }
  }
`;
