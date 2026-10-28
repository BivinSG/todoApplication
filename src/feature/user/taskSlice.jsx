import { createSlice } from "@reduxjs/toolkit";
import { deleteTask, fetchTasks, postTask } from "./taskThunks";

const initialState = {
  tasks: [],
  searchTask: "",
  loading: false,
  error: null,
};

const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    searchTask(state, action) {
      state.searchTask = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
      })

      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = action.payload;
      })

      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })

      .addCase(postTask.pending, (state) => {
        state.loading = true;
        state.error = null;
      })

      .addCase(postTask.fulfilled, (state, action) => {
        state.loading = false;
        const newTask = action.payload;

        if (newTask && !state.tasks.some((task) => task?._id === newTask?._id)) {
          state.tasks = [...state.tasks, newTask];
        }
      })

      .addCase(postTask.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload?.error ||
          action.error.message;
      })

      .addCase(deleteTask.pending, (state) => {
        state.loading = true;
      })

      .addCase(deleteTask.fulfilled, (state, action) => {
        state.loading = false;
        state.tasks = state.tasks.filter((task) => task?._id !== action.payload);
      })

      .addCase(deleteTask.rejected, (state, action) => {
        state.loading = false;
        state.error =
          action.payload?.message ||
          action.payload?.error ||
          action.error.message;
      });
  },
});

export const { searchTask } = taskSlice.actions;

export default taskSlice.reducer;
