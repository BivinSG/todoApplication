import { createBrowserRouter } from "react-router-dom";
import App from "../App.jsx";
import "../index.css";
import AdminDashboard from "../feature/manage_user/AdminDashboard.jsx";
import SignIn from "../feature/authentication/SignIn.jsx";
import SignUp from "../pages/SignUp.jsx";
import Unauthorized from "../pages/Unauthorized.jsx";
import RouteProtector from "./RouteProtector.jsx";
import Todo from "../feature/user/Todo.jsx";
import UserProfile from "../feature/authentication/UserProfile.jsx";
import ErrorBoundary from "./ErrorBoundary.jsx";

const router = createBrowserRouter([
  { path: "/", Component: SignIn, ErrorBoundary: ErrorBoundary },
  { path: "/login", Component: SignIn, ErrorBoundary: ErrorBoundary },
  { path: "/register", Component: SignUp, ErrorBoundary: ErrorBoundary },
  {
    Component: App,
    ErrorBoundary: ErrorBoundary,
    children: [
      {
        element: <RouteProtector role={1000} />,
        ErrorBoundary: ErrorBoundary,
        children: [
          {
            path: "/to-do-app",
            Component: Todo,
          },
          {
            path: "/user-profile",
            Component: UserProfile,
          },
        ],
      },
      {
        element: <RouteProtector role={1100} />,
        ErrorBoundary: ErrorBoundary,
        children: [
          {
            path: "/admin-dashboard",
            Component: AdminDashboard,
          },
        ],
      },
    ],
  },
  {
    path: "/unauthorized",
    Component: Unauthorized,
  },
]);

export default router;
