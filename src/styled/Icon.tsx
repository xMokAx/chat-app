import React, { useContext } from "react";
import styled, { DefaultTheme } from "styled-components/macro";
import { IconFontContext } from "../App";

interface ContainerProps {
  isLeft?: boolean;
  isRight?: boolean;
  "aria-label"?: string;
}

interface IconProps {
  children: string;
  size?: string;
  color?: keyof DefaultTheme["colors"];
}

type Props = IconProps & ContainerProps;

const Container = styled.span.attrs(props => ({
  "aria-hidden": props["aria-label"] ? false : true
}))<ContainerProps>`
  align-items: center;
  display: inline-flex;
  justify-content: center;

  left: ${props => props.isLeft && "0"};

  right: ${props => props.isRight && "0"};
`;

const Icon = styled.i.attrs({
  className: "material-icons"
})<IconProps>`
  font-size: ${props => props.size && props.size};
  color: ${props => props.color && props.theme.colors[props.color]};
`;

export default ({ children, size, color, ...props }: Props) => {
  const { iconFontLoaded } = useContext(IconFontContext);
  return (
    <Container {...props}>
      {iconFontLoaded ? (
        <Icon color={color} size={size}>
          {children}
        </Icon>
      ) : (
        "☐"
      )}
    </Container>
  );
};
