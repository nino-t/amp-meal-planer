import axios from "axios";
import { postAuthRevokeTokenAction } from "../app/auth/auth.action";
import { RootStore } from "../app/store";

let store: RootStore;
const baseUrl = `${process.env.REACT_APP_API_URL}`;

export const axiosSetupInterceptors = (_store: RootStore) => {
  store = _store;
};

const axiosInstance = axios.create({
  baseURL: baseUrl,
  params: {
    apikey: `${process.env.REACT_APP_API_KEY}`,
  },
  timeout: 1000,
});

axiosInstance.interceptors.request.use((config) => {
  if (!config.headers) {
    config.headers = {};
  }

  const accessToken = store.getState().auth.auth?.access_token.token ?? null;
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

axiosInstance.interceptors.response.use(
  (config) => {
    return config;
  },
  (error) => {
    const originalRequest = error.config;
    const accessToken = store.getState().auth.auth?.access_token.token ?? null;
    const refreshToken = store.getState().auth.auth?.refresh_token.token ?? null;

    if (error.response.status === 401 && accessToken && refreshToken && !originalRequest._retry) {
      originalRequest._retry = true;
      return store
        .dispatch(
          postAuthRevokeTokenAction({
            refresh_token: refreshToken,
          })
        )
        .then((result) => {
          const { access_token } = result.payload || {};
          axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${access_token.token}`;
          return axiosInstance.request(originalRequest);
        });
    }

    // Redirect to login
    return Promise.reject(error);
  }
);

export default axiosInstance;
