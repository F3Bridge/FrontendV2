import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import backend from "../slices/backend";

export const store = configureStore({
  reducer: {
    backend,
  },
  preloadedState: {
    backend: {
      status: "idle",
      refreshToken: localStorage.getItem("backendRefreshToken") ?? undefined,
      accessToken: localStorage.getItem("backendAccessToken") ?? undefined,
    },
  },
});

store.subscribe(() => {
  const state = store.getState();
  if (state.backend.accessToken) {
    localStorage.setItem("backendAccessToken", state.backend.accessToken);
  } else {
    localStorage.removeItem("backendAccessToken");
  }
  if (state.backend.refreshToken) {
    localStorage.setItem("backendRefreshToken", state.backend.refreshToken);
  } else {
    localStorage.removeItem("backendRefreshToken");
  }
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
