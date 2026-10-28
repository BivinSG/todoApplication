import { configureStore } from "@reduxjs/toolkit";
import taskReducer from "./feature/user/taskSlice";
import authReducer from "./feature/authentication/authSlice";
import userReducer from "./feature/manage_user/userSlice";

const rootReducer = {
  authState: authReducer,
  taskState: taskReducer,
  userState: userReducer,
};

const store = configureStore({
  reducer: rootReducer,
});

console.log(store.getState());

export default store;
