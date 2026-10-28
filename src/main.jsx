import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import { Provider } from "react-redux";
import store from "./store";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import router from "./Routes/AppRoutes";

createRoot(document.getElementById("root")).render(
  // <StrictMode>
  <Provider store={store}>
    <ToastContainer />
    <RouterProvider router={router} />
  </Provider>,

  // </StrictMode>,
);
