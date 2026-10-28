import { login, register } from "./authThunks";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loading: false,
  error: null,
  auth: JSON.parse(localStorage.getItem("auth") || "null"),
};

const authSlice = createSlice({
  name: "auth",

  initialState,

  reducers: {
    logOut: (state) => {
      state.auth = null;
      localStorage.removeItem("auth");
    },

    resetStatus: (state) => {
      state.loading = false;
      state.error = null;
    },
  },

  extraReducers: (builder) => {
    builder

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(register.fulfilled, (state) => {
        state.loading = false;
        state.error = null;
      })

      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
      })

      .addCase(login.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(login.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.auth = action.payload;
      })

      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { logOut, resetStatus } = authSlice.actions;

export default authSlice.reducer;
