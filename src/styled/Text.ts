import styled, { DefaultTheme } from "styled-components";

interface Props {
  size?: string;
  color?: keyof DefaultTheme["colors"];
}

export default styled.p<Props>`
  font-size: ${props => props.size && props.size};
  color: ${props => props.color && props.color};
`;
