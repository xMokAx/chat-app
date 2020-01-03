import React from "react";
import styled, { DefaultTheme } from "styled-components/macro";

interface ConProps {
  bgCon?: keyof DefaultTheme["colors"];
}

interface BarProps {
  value: number;
  bgBar?: keyof DefaultTheme["colors"];
}

const ProgressContainer = styled.div<ConProps>`
  width: 100%;
  background-color: ${props =>
    props.bgCon ? props.theme.colors[props.bgCon] : props.theme.colors.bgSec};
  border-radius: 0.25rem;
  height: 10px;
`;

const ProgressBar = styled.div.attrs((props: BarProps) => ({
  role: "progressbar",
  "aria-valuenow": props.value,
  "aria-valuemin": "0",
  "aria-valuemax": "100"
}))<BarProps>`
  height: 100%;
  border-radius: 0.25rem;
  transition: width 250ms ease-in-out;
  width: ${props => `${props.value}%`};
  background-color: ${props =>
    props.bgBar ? props.theme.colors[props.bgBar] : props.theme.colors.primary};
`;

type Props = BarProps & ConProps;

const Progress = ({ value, bgBar, bgCon }: Props) => (
  <ProgressContainer bgCon={bgCon}>
    <ProgressBar value={value} bgBar={bgBar} />
  </ProgressContainer>
);

export default Progress;
