import { Box } from "@chakra-ui/react";
import React from "react";
import { fetchUserList } from "../../app/users/users.api";

const Home: React.FC = () => {
  React.useEffect(() => {
    fetchUserList().then((response) => {
      console.log("response =>", response);
    });
  });

  return (
    <Box minH="100vh" bg="purple.500">
      <p>Hello World</p>
    </Box>
  );
};

export default Home;
