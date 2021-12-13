import { createSlice } from "@reduxjs/toolkit";
import { postAuthLoginAction, postAuthRevokeTokenAction } from "./auth.action";
import initialState from "./auth.state";

const authSlice = createSlice({
  name: "auth",
  initialState: initialState,
  reducers: {
    clearAuth: () => {
      return initialState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postAuthLoginAction.pending, (state) => ({
        ...initialState,
        status: "loading",
      }))
      .addCase(postAuthLoginAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.auth = action.payload;
      })
      .addCase(postAuthLoginAction.rejected, (state) => {
        state.status = "error";
      })
      .addCase(postAuthRevokeTokenAction.fulfilled, (state, action) => {
        const { refresh_token = {}, access_token = {} } = action.payload;

        if (state.auth) {
          state.auth = {
            ...state.auth,
            refresh_token: {
              token: refresh_token.token,
              exp: refresh_token.exp,
            },
            access_token: {
              token: access_token.token,
              exp: access_token.exp,
            },
          };
        }
      });
  },
});

export const actions = authSlice.actions;

export default authSlice.reducer;
