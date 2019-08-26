import React from "react";
import styled from "styled-components/macro";

const Container = styled.div`
  width: 48px;
  height: 24px;
  background-color: ${props => props.theme.colors.bgSec};
  display: block;
  border-radius: 12px;
  margin: 1rem 0.75rem;
  margin-left: auto;
  &:last-child {
    margin-right: 0;
  }
  position: relative;
  cursor: pointer;
  &:active span:first-of-type {
    width: 26px;
  }
`;

interface InputProps {
  isDarkMode: boolean;
}

const Input = styled.input<InputProps>`
  height: 0;
  width: 0;
  visibility: hidden;
`;

const Icon = styled.span<InputProps>`
  position: absolute;
  top: 1px;
  left: ${props => (props.theme.isDarkMode ? "1px" : "calc(100% - 1px)")};
  width: 22px;
  height: 22px;
  border-radius: 11px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  transform: ${props =>
    props.theme.isDarkMode ? "unset" : "translateX(-100%)"};
`;

const Toggler = styled.span<InputProps>`
  position: absolute;
  z-index: 1;
  top: 1px;
  left: ${props => (props.theme.isDarkMode ? "calc(100% - 1px)" : "1px")};
  width: 22px;
  height: 22px;
  background-color: ${props => props.theme.colors.primary};
  border-radius: 11px;
  transition: all 0.5s cubic-bezier(0.23, 1, 0.32, 1) 0ms;
  transform: ${props =>
    props.theme.isDarkMode ? "translateX(-100%)" : "unset"};
`;

interface Props {
  isDarkMode: boolean;
  toggleTheme: () => void;
}

const Toggle = ({ isDarkMode, toggleTheme }: Props) => (
  <Container
    onClick={toggleTheme}
    tabIndex={0}
    onKeyUp={e => {
      if (e.keyCode === 13 || e.keyCode === 32) {
        toggleTheme();
      }
    }}
  >
    <Input
      id="toggle"
      type="checkbox"
      isDarkMode={isDarkMode}
      aria-label="Switch between Dark and Light mode"
    />
    <Toggler isDarkMode={isDarkMode} />
    <Icon
      isDarkMode={isDarkMode}
      role="img"
      aria-label={isDarkMode ? "Dark mode" : "Light Mode"}
    >
      {isDarkMode ? "🌙" : "☀️"}
    </Icon>
  </Container>
);

export default Toggle;
