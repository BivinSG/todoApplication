import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../feature/authentication/authSlice";
import Button from "../Button";
import { Link } from "react-router-dom";

const NavBar = () => {
  const dispatch = useDispatch();

  const { auth } = useSelector((state) => state.authState);

  const handleLogout = () => {
    localStorage.removeItem("auth");
    dispatch(logOut());
  };

  return (
    <nav className="d-flex justify-content-between align-items-center p-3 bg-dark">
      <div className="text-white fs-5 ms-3">ToDo App</div>

      <div className="d-flex gap-2 align-items-center me-3">
        <div className="text-info">
          {auth?.role === 1000 ? (
            <Link to="/user-profile">
              <span>{auth?.name}</span>
            </Link>
          ) : (
            <span>{auth?.name}</span>
          )}
        </div>

        <Button
          className="btn btn-warning"
          buttonText="Logout"
          handleClick={handleLogout}
        />
      </div>
    </nav>
  );
};

export default NavBar;
