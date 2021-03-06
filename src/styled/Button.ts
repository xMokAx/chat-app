import styled, { DefaultTheme } from "styled-components/macro";
import { lighten, darken, rgba } from "polished";

export interface ButtonProps {
  bg?: keyof DefaultTheme["colors"];
  color?: keyof DefaultTheme["colors"];
  size?: "l" | "s";
  w?: string;
  circle?: boolean;
  h?: string;
}

export default styled.button<ButtonProps>`
  border: none;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-weight: 500;
  height: ${props => props.h && props.h};
  width: ${props => props.w && props.w};
  background: ${props =>
    props.bg ? props.theme.colors[props.bg] : "transparent"};
  color: ${props =>
    props.bg ? props.theme.colors.textMain : props.theme.colors.textSec};
  color: ${props => props.color && props.theme.colors[props.color]};
  padding: ${props => (props.size === "s" ? "0.375rem" : "0.5rem 1rem")};
  font-size: ${props => (props.size === "l" ? "1.25rem" : "1rem")};
  line-height: 1.5;
  border-radius: ${props => (props.circle ? "50%" : "0.25rem")};
  &:hover,
  &:active {
    color: ${props => props.theme.colors.textMain};
    background: ${props =>
      props.bg
        ? props.theme.isDarkMode
          ? darken(0.1, props.theme.colors[props.bg])
          : lighten(0.1, props.theme.colors[props.bg])
        : "transparent"};
    text-decoration: none;
  }
  &:focus {
    outline: ${props => props.bg && "none"};
    color: ${props => props.color && props.theme.colors.textMain};
    box-shadow: 0 0 0 0.2rem
      ${props =>
        props.bg
          ? rgba(props.theme.colors[props.bg], 0.5)
          : rgba(props.theme.colors.primary, 0.5)};
  }
  &:disabled {
    background-color: ${props => props.theme.colors.bgSec};
    color: ${props => props.theme.colors.grey};
  }
  & > div {
    margin-left: 8px;
  }
`;
