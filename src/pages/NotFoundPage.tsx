import React from "react";
import { FlexContainer } from "../styled/Flex";
import Error from "../styled/Error";

const NotFoundPage = () => (
  <FlexContainer p="32px 0">
    <Error as="h1" size="32px" align="center">
      404 | PAGE NOT FOUND
    </Error>
  </FlexContainer>
);

export default NotFoundPage;
