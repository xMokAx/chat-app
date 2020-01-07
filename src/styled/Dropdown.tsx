import React, { ReactNode, useEffect, useRef } from "react";
import styled from "styled-components/macro";
import Icon from "./Icon";
import Button from "./Button";

interface ContainerProps {
  containerStyle: string;
}

interface MenuProps {
  isActive: boolean;
  left: string;
}

type Props = MenuProps &
  ContainerProps & {
    children: ReactNode;
    circleButton?: boolean;
    openOrCloseMenu: (menuState: boolean) => void;
  };

const Container = styled.div<ContainerProps>`
  display: inline-flex;
  position: relative;
  vertical-align: middle;
  height: fit-content;
  ${props => props.containerStyle && props.containerStyle}
`;

const Menu = styled.div<MenuProps>`
  position: absolute;
  top: 100%;
  left: ${props => props.left};
  z-index: 1000;
  display: ${props => (props.isActive ? "block" : "none")};
  min-width: 10rem;
  padding: 0.5rem 0;
  margin: 0.125rem 0 0;
  font-size: 1rem;
  color: ${props => props.theme.colors.grey};
  text-align: left;
  list-style: none;
  background-color: ${props => props.theme.colors.bgMain};
  background-clip: padding-box;
  border: 1px solid ${props => props.theme.colors.bgSec};
  border-radius: 0.25rem;
  & > * {
    display: block;
    margin: 0;
    border-radius: 0;
    width: 100%;
    &:hover {
      background: ${props => props.theme.colors.bgSec};
    }
  }
`;

const Dropdown = ({
  children,
  isActive,
  left,
  circleButton,
  openOrCloseMenu,
  containerStyle = ""
}: Props) => {
  console.log(children);
  const menuRef = useRef(null);
  useEffect(() => {
    const clickHandler = () => {
      if (isActive) {
        openOrCloseMenu(false);
      }
    };
    document.addEventListener("click", clickHandler);

    const escapeHandler = (e: KeyboardEvent) => {
      if (isActive) {
        if (e.key === "Escape") {
          openOrCloseMenu(false);
        }
      }
    };
    document.addEventListener("keydown", escapeHandler);

    const upDownHandler = (e: KeyboardEvent) => {
      console.log(e.key);
      const menuChildren = Array.from(
        ((menuRef.current as unknown) as HTMLDivElement).children
      );
      let index =
        menuChildren.indexOf(document.activeElement!!) === -1
          ? 0
          : menuChildren.indexOf(document.activeElement!!);
      if (isActive) {
        console.log(index);
        if (e.key === "ArrowUp" || e.key === "ArrowDown") {
          e.preventDefault();
          if (
            !document.activeElement ||
            !menuChildren.includes(document.activeElement)
          ) {
            (menuChildren[0] as HTMLElement).focus();
          } else {
            if (e.key === "ArrowUp") {
              if (document.activeElement === menuChildren[0]) {
                return;
              }
              (menuChildren[index - 1] as HTMLElement).focus();
              index--;
            } else {
              if (
                document.activeElement === menuChildren[menuChildren.length - 1]
              ) {
                return;
              }
              (menuChildren[index + 1] as HTMLElement).focus();
              index++;
            }
          }
        }
      }
    };
    document.addEventListener("keydown", upDownHandler);

    return () => {
      document.removeEventListener("click", clickHandler);
      document.removeEventListener("keydown", escapeHandler);
      document.removeEventListener("keydown", upDownHandler);
    };
  }, [isActive, openOrCloseMenu]);
  return (
    <Container containerStyle={containerStyle}>
      <Button
        aria-label="toggle menu"
        circle={circleButton}
        bg="primary"
        size="s"
        onClick={() => {
          if (!isActive) {
            openOrCloseMenu(true);
          }
        }}
      >
        <Icon
          size="16px"
          icon={isActive ? "arrow_drop_up" : "arrow_drop_down"}
        />
      </Button>
      <Menu isActive={isActive} left={left} ref={menuRef}>
        {children}
      </Menu>
    </Container>
  );
};

export default Dropdown;
