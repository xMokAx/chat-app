import React from "react";
import styled, { DefaultTheme } from "styled-components/macro";

const unicodeIcons = {
  email: "\ue0be",
  edit: "\ue3c9",
  visibility: "\ue8f4",
  visibility_off: "\ue8f5",
  lock: "\ue897",
  person: "\ue7fd",
  arrow_drop_up: "\ue5c7",
  arrow_drop_down: "\ue5c5",
  search: "\ue8b6",
  send: "\ue163",
  arrow_downward: "\ue5db",
  filter_list: "\ue152"
};

export type UnicodeIcons = typeof unicodeIcons;

interface ContainerProps {
  isLeft?: boolean;
  isRight?: boolean;
  "aria-label"?: string;
}

interface IconProps {
  size?: string;
  color?: keyof DefaultTheme["colors"];
}

type Props = IconProps & ContainerProps & { icon: keyof UnicodeIcons };

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
  font-size: ${props => (props.size ? props.size + "!important" : "24px")};
  color: ${props => props.color && props.theme.colors[props.color]};
`;

export default ({ icon, size, color, ...props }: Props) => {
  return (
    <Container {...props}>
      <Icon color={color} size={size}>
        {unicodeIcons[icon]}
      </Icon>
    </Container>
  );
};
