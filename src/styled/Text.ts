import styled, { DefaultTheme } from "styled-components";

interface Props {
  size?: string;
  color?: keyof DefaultTheme["colors"];
  m?: string;
  p?: string;
  align?: string;
  weight?: string;
}

export default styled.p<Props>`
  font-size: ${props => props.size && props.size};
  color: ${props => props.color && props.theme.colors[props.color]};
  margin: ${props => props.m && props.m};
  padding: ${props => props.p && props.p};
  text-align: ${props => props.align && props.align};
  font-weight: ${props => props.weight && props.weight};
`;
