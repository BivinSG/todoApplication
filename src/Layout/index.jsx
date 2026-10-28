import NavBar from "../Components/Navbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <div className="min-vh-100 d-flex flex-column vw-100">
      <NavBar />
      <Outlet />
    </div>
  );
}

export default Layout;
