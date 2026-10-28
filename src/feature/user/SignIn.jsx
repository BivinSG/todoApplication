import { useState, useRef, useEffect } from "react";
import Input from "../../Components/Input";
import styles from "./Auth.module.css";
import Button from "../../Components/Button";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { login } from "../authentication/authThunks";
import { ToastContainer, toast } from "react-toastify";
import { resetStatus } from "../authentication/authSlice";

const SignIn = () => {
  const [formValues, setFormValues] = useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = useState({});
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  // Get auth and error from Redux store
  const { auth, error, loading } = useSelector((state) => state.authState);
  const inputRef = useRef(null);

  // Focus on email input when page loads
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  useEffect(() => {
    if (!error && auth?.role && auth) {
      localStorage.setItem("auth", JSON.stringify(auth));
      if (Number(auth.role) === 1000) navigate("/to-do-app");
      if (Number(auth.role) === 1100) navigate("/admin-dashboard");
    }
    if (error) {
      const errorMessage =
        error?.message || error?.error || "Login failed. Please check your credentials.";
      toast.error(errorMessage);
      dispatch(resetStatus());
    }
  }, [auth, auth?.role, error]);

  const handleSubmit = async () => {
    // Email validation
    if (!formValues?.email) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        email: "Email is required",
      }));
      return;
    }

    // Password validation
    if (!formValues?.password) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        password: "Password is required",
      }));

      return;
    }

    // Dispatch login thunk
    await dispatch(login(formValues));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));

    // Remove error when user starts typing
    setFormErrors((prevValues) => ({
      ...prevValues,
      [name]: "",
    }));
  };

  return (
    <div className={styles["outer-container"]}>
      <ToastContainer />
      <div className="w-100">
        {/* Heading */}
        <div className="d-flex justify-content-center">
          <div className="fs-2 fw-bold mb-2 text-info">Todo App</div>
        </div>
          {location.state?.registered && (
            <div role="status">Account created. Sign in with your new credentials.</div>
          )}

        {/* Email */}
        <Input
          inputRef={inputRef}
          name="email"
          value={formValues?.email}
          type="email"
          placeholder="Your email..."
          handleInputChange={handleInputChange}
          error={formErrors?.email}
        />

        {/* Password */}
        <Input
          name="password"
          value={formValues?.password}
          type="password"
          placeholder="Your password..."
          handleInputChange={handleInputChange}
          error={formErrors?.password}
        />

        <div className="d-flex justify-content-between mt-10">
          {/* Register Link */}
          <div>
            <Link to="/register">
              <span>Register</span>
            </Link>
          </div>

          {/* Login Button */}
          <div>
            <Button
              className="btn btn-primary w-100 mt-2"
              handleClick={handleSubmit}
              disabled={loading}
              buttonText={loading ? "Signing in..." : "Login"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
