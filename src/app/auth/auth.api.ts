import request from "../../utils/request";
import { Auth, LoginPayload, RevokeTokenPayload } from "./auth.interface";

export const postAuthLogin = async (payload: LoginPayload): Promise<Auth> => {
  try {
    const httpResponse = await request.post(`/_/auth/login`, {
      ...payload,
    });
    return httpResponse.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const postAuthRevokeToken = async (payload: RevokeTokenPayload) => {
  try {
    const httpResponse = await request.post(`/_/auth/token-revoke`, {
      ...payload,
    });
    return httpResponse.data?.data;
  } catch (error) {
    return Promise.reject(error);
  }
};
