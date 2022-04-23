import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { useAppSelector } from "../store";
import { ax } from "../utils";

interface BackendSliceState {
  status: "idle" | "pending" | "error";
  refreshToken?: string;
  accessToken?: string;
}

const slice = createSlice({
  name: "backend",
  initialState: { status: "idle" } as BackendSliceState,
  reducers: {
    setTokens(
      state,
      action: PayloadAction<{
        refreshToken: string;
        accessToken: string;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
    },
    refreshBackendToken(state, action: PayloadAction<{ accessToken: string }>) {
      state.accessToken = action.payload.accessToken;
    },
    signOut(state) {
      state.accessToken = undefined;
      state.refreshToken = undefined;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(signIn.pending, (state) => {
      state.status = "pending";
    });
    builder.addCase(
      signIn.fulfilled,
      (
        state,
        action: PayloadAction<{ refreshToken: string; accessToken: string }>
      ) => {
        state.status = "idle";
        state.accessToken = action.payload.accessToken;
        state.refreshToken = action.payload.refreshToken;
      }
    );
    builder.addCase(signIn.rejected, (state) => {
      state.status = "error";
    });
  },
});

export const signIn = createAsyncThunk(
  "backend/signIn",
  async (params: { name: string; password: string }) => {
    const result = await ax.post("/v1/employees/signin", {
      userName: params.name,
      password: params.password,
    });
    return result.data;
  }
);

// Extract the action creators object and the reducer
const { actions, reducer } = slice;
// Extract and export each action creator by name
export const { setTokens, signOut, refreshBackendToken } = actions;
// Export the reducer, either as a default or named export
export default reducer;
