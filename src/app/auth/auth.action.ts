import { createAsyncThunk } from "@reduxjs/toolkit";
import { LoginPayload, RevokeTokenPayload } from "./auth.interface";
import * as api from "./auth.api";

export const postAuthLoginAction = createAsyncThunk(
  `auth/postAuthLogin`,
  async (args: LoginPayload) => {
    const response = await api.postAuthLogin(args);
    return response;
  }
);

export const postAuthRevokeTokenAction = createAsyncThunk(
  `auth/postAuthRevokeToken`,
  async (args: RevokeTokenPayload) => {
    const response = await api.postAuthRevokeToken(args);
    return response;
  }
);
