import React from "react";
import { Outlet } from "react-router-dom";
import { ChakraProvider, Container } from "@chakra-ui/react";
import theme from "../theme/theme";

const MasterLayout = (): JSX.Element => {
  return (
    <ChakraProvider theme={theme}>
      <Container>
        <Outlet />
      </Container>
    </ChakraProvider>
  );
};

export default MasterLayout;
