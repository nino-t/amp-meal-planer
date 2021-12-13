import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import React from "react";
import { useForm } from "react-hook-form";
import { postAuthLoginAction } from "../../app/auth/auth.action";
import { useAppDispatch } from "../../app/hooks";
import { useNavigate } from "react-router-dom";
import { useToast } from "@chakra-ui/react";
import _get from "lodash/get";

const AuthSignInEmail: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { register, handleSubmit } = useForm();

  const signIn = async (values: { email: string; password: string }) => {
    const toastDelay = 3000; // Seconds
    const result = await dispatch(postAuthLoginAction(values));

    if (result.meta.requestStatus === "fulfilled") {
      toast({
        title: "Sign in successfully!",
        description: "Enjoy our catalog product.",
        status: "success",
        duration: toastDelay,
        position: "top",
      });

      setTimeout(() => {
        navigate("/browse");
      }, toastDelay);
    } else {
      toast({
        title: "Oops, something mising wrong!",
        description: _get(result, "error.message", "Please try again."),
        status: "error",
        duration: toastDelay,
        position: "top",
      });
    }
  };

  return (
    <Box minH="100vh" bg="purple.500">
      <Box as="form" px={10} pt={20} onSubmit={handleSubmit(signIn)}>
        <FormControl isRequired mb={4}>
          <FormLabel textColor="white">Email address</FormLabel>
          <Input type="email" placeholder="Enter your email..." {...register("email")} />
        </FormControl>

        <FormControl isRequired mb={4}>
          <FormLabel textColor="white">Password</FormLabel>
          <Input type="password" placeholder="Enter your password..." {...register("password")} />
        </FormControl>

        <Button type="submit">Sign In</Button>
      </Box>
    </Box>
  );
};

export default AuthSignInEmail;
