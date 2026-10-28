import { createAsyncThunk } from "@reduxjs/toolkit";
import { logOut } from "../authentication/authSlice";
import apiClient from "../../services/apiClient";

export const fetchTasks = createAsyncThunk(
  "task/fetchTasks",
  async (_, { dispatch, signal }) => {
    const response = await apiClient.get(`/task`, {
      method: "GET",
      signal,
    });
    if (response?.status === 403) {
      localStorage.removeItem("auth");
      dispatch(logOut());
    }
    return response?.data;
  },
);

export const postTask = createAsyncThunk("task/postTask", async (taskData) => {
  const response = await apiClient.post(`/task`, taskData, {});
  return response?.data?.data?.task || response?.data?.task || response?.data;
});

export const deleteTask = createAsyncThunk(
  "task/deleteTask",
  async (deleteTaskId) => {
    await apiClient.delete(`/task/${deleteTaskId}`, {});
    return deleteTaskId;
  },
);
