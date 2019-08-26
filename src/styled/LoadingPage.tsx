import React from "react";
import styled from "styled-components/macro";
import Loading from "./Loading";

const Container = styled.div`
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 999;
  background-color: ${props => props.theme.colors.bgMain};
  display: flex;
  justify-content: center;
  align-items: center;
`;

const LoadingPage = () => (
  <Container>
    <Loading />
  </Container>
);

export default LoadingPage;
