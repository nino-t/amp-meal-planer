import React from "react";
import { Box, Button, Text, VStack, Divider, Image } from "@chakra-ui/react";
import authSigninBackgroundImage from "../../assets/images/auth-signin-background.jpg";
import facebookIconImage from "../../assets/images/ic-facebook.png";
import googleIconImage from "../../assets/images/ic-google.png";
import appleIconImage from "../../assets/images/ic-apple.png";

const AuthSignin = (): JSX.Element => {
  return (
    <Box minH="100vh" bg="purple.500">
      <Box
        pos="relative"
        w="full"
        _before={{
          content: "''",
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: "block",
          background: "linear-gradient(360deg, #8A47EB 0%, rgba(255, 255, 255, 0) 100%)",
        }}
      >
        <Image src={authSigninBackgroundImage} w="full" />
      </Box>

      <Box px={10}>
        <VStack w="full" spacing={5}>
          <Button w="full" variant="secondary" py={8}>
            Sign up with email
          </Button>
          <VStack w="full" p="relative" pb={2}>
            <Box pos="absolute" bg="primary" mt={-1} zIndex={1} px={4}>
              <Text color="white">or use social sign up</Text>
            </Box>
            <Divider />
          </VStack>
          <Button width="full" py={6}>
            <Image
              boxSize="20px"
              objectFit="cover"
              src={googleIconImage}
              alt="Continue with Google"
              mr={2}
            />
            Continue with Google
          </Button>
          <Button width="full" py={6}>
            <Image
              boxSize="20px"
              objectFit="cover"
              src={facebookIconImage}
              alt="Continue with Facebook"
              mr={2}
            />
            Continue with Facebook
          </Button>
          <Button width="full" py={6}>
            <Image
              boxSize="20px"
              objectFit="cover"
              src={appleIconImage}
              alt="Continue with Apple"
              mr={2}
            />
            Continue with Apple
          </Button>
          <Text color="white">
            Already to have account?{" "}
            <Text textDecor="underline" as="a">
              Log In
            </Text>
          </Text>
        </VStack>
      </Box>
    </Box>
  );
};

export default AuthSignin;
