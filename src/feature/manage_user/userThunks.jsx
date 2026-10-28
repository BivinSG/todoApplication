import { createAsyncThunk } from "@reduxjs/toolkit";
import apiClient from "../../services/apiClient";

export const fetchUsers = createAsyncThunk("user/fetchUsers", async (_) => {
  const response = await apiClient.get("v1/users", {});
  return response?.data;
});

export const restrictUserAccess = createAsyncThunk(
  "user/restrictUserAccess",
  async (userId) => {
    const response = await apiClient.put(`v1/users/${userId}`, {});
    return response?.data?.user;
  },
);
