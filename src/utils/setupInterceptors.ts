import { ax } from "./axios";
import { Store } from "@reduxjs/toolkit";
import { refreshBackendToken, signOut } from "../slices/backend";

export const setupAxiosInterceptors = (store: Store) => {
  ax.interceptors.request.use(
    (config) => {
      const token = store.getState().auth.accessToken;
      if (config.url === "/api/v1/auth/refresh") return config;
      if (token) {
        config.headers!["Authorization"] = `Bearer ${token}`;
      }
      return config;
    },
    (err) => {
      return Promise.reject(err);
    }
  );

  const { dispatch } = store;
  ax.interceptors.response.use(
    (res) => {
      return res;
    },
    async (err) => {
      const originalConfig = err.config;

      const { refreshToken } = store.getState().auth;

      if (
        ![
          "/api/v1/auth",
          "/api/v1/auth/verify",
          "/api/v1/auth/refresh",
        ].includes(originalConfig.url) &&
        err.response
      ) {
        // Access Token was expired
        if (
          err.response.status === 401 &&
          !originalConfig._retry &&
          refreshToken
        ) {
          originalConfig._retry = true;

          try {
            const rs = await ax.get("/v1/auth/employee/refresh", {
              headers: { Authorization: `Bearer ${refreshToken}` },
            });

            const { accessToken } = rs.data;

            dispatch(refreshBackendToken({ accessToken }));

            return ax(originalConfig);
          } catch (refreshError: any) {
            if (refreshError.response.status === 401) {
              dispatch(signOut());
            }
            return Promise.reject(err);
          }
        }
      }

      return Promise.reject(err);
    }
  );
};
