import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

// REGISTER
export const register = createAsyncThunk("auth/register", async (userData) => {
  const response = await apiClient.post("/register", userData);
  return response?.data;
});

// LOGIN
export const login = createAsyncThunk(
  "auth/login",
  async (userData, { rejectWithValue }) => {
    {
      try {
        const response = await apiClient.post("/login", userData);
        return response?.data;
      } catch (error) { 
        console.log(error);
        console.log(error?.response);
        return rejectWithValue({
          error: error?.response?.data?.message || "Something went wrong. . .",
        });
      }
    }
  },
);
