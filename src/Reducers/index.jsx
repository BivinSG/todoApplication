import authReducer from "./authReducer";
import taskReducer from "./taskReducer";

const rootReducer = {
  authState: authReducer,
  taskState: taskReducer,
};

export default rootReducer;
