import React, { ReactNode } from "react";
import styled from "styled-components/macro";

interface ContainerProps {
  isOnline?: boolean;
}

const Container = styled.div<ContainerProps>`
  margin-left: -16px;
  margin-right: -16px;
  padding: 4px;
  position: sticky;
  top: 0;
  :not(:first-child) {
    top: 36px;
  }
  background-color: ${props => props.theme.colors.bgMain};
  z-index: 999;
  color: ${props =>
    props.isOnline ? props.theme.colors.green : props.theme.colors.red};
  text-align: center;
  p {
    margin: 0;
  }
  &:not(:first-child) {
    margin-top: 4px;
  }
`;

type Props = ContainerProps & {
  children: ReactNode;
};

const ErrorMessage = ({ children, isOnline }: Props) => (
  <Container isOnline={isOnline}>
    <p role="alert">{children}</p>
  </Container>
);

export default ErrorMessage;
