import styled, { DefaultTheme } from "styled-components/macro";
import { NavLink } from "react-router-dom";
import { rgba } from "polished";

interface Props {
  color?: keyof DefaultTheme["colors"];
  p?: string;
  m?: string;
  display?: string;
}

export default styled(NavLink)<Props>`
  display: ${props => (props.display ? props.display : "inline-flex")};
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: ${props => (props.p ? props.p : "0.5rem")};
  margin: ${props => (props.m ? props.m : "3px")};
  border-radius: 0.25rem;
  color: ${props =>
    props.color ? props.theme.colors[props.color] : props.theme.colors.grey};
  font-weight: 500;
  &:hover,
  &:focus {
    text-decoration: none;
    color: ${props => props.theme.colors.textMain};
  }
  &:hover {
    background-color: ${props => props.theme.colors.bgSec};
  }
  &:focus {
    box-shadow: 0 0 0 0.2rem ${props => rgba(props.theme.colors.primary, 0.5)};
  }
  &.active {
    color: ${props => props.theme.colors.textMain};
    background-color: ${props => props.theme.colors.bgSec};
  }
`;
