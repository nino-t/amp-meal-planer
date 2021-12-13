import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload } from "./auth.interface";
import * as api from "./auth.api";

export const postAuthLoginAction = createAsyncThunk(
  `auth/postAuthLogin`,
  async (args: LoginPayload) => {
    const response = await api.postAuthLogin(args);
    return response;
  }
);
