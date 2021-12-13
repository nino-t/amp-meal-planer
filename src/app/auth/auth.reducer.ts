import { createSlice } from "@reduxjs/toolkit";
import { postAuthLoginAction } from "./auth.action";
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
        status: 'loading'
      }))
      .addCase(postAuthLoginAction.fulfilled, (state, action) => {
        state.status = "idle";
        state.auth = action.payload;
      })
      .addCase(postAuthLoginAction.rejected, (state) => {
        state.status = 'error';
      })
  },
});

export const actions = authSlice.actions;

export default authSlice.reducer;
