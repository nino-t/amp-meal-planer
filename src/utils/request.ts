import axios from "axios";
import { RootStore } from "../app/store";

export const baseUrl = `${process.env.REACT_APP_API_URL}`;

export const axiosSetupInterceptors = (store: RootStore) => {
  axios.interceptors.request.use((config) => {
    if (!config.headers) {
      config.headers = {};
    }

    const accessToken = store.getState().auth.auth?.access_token.token ?? null;
    if (accessToken) {
      config.headers.authorization = `Bearer ${accessToken}`;
    }
  });

  axios.interceptors.response.use((config) => {
    console.log("config =>", config);
  });
};

export const request = axios.create({
  baseURL: baseUrl,
  params: {
    apikey: `${process.env.REACT_APP_API_KEY}`,
  },
  timeout: 1000,
});

export default request;
