import { useState, useRef, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

import Input from "../Components/Input";
import styles from "./Auth.module.css";
import Button from "../Components/Button";

import { register } from "../feature/authentication/authThunks";
import { useDispatch, useSelector } from "react-redux";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { loading, error: registerError } = useSelector(
    (state) => state.authState,
  );

  const inputRef = useRef(null);

  // Focus on name input when page loads
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSubmit = async () => {
    // Name validation
    if (!formValues.name.trim()) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        name: "Name is required",
      }));
      return;
    }

    // Email validation
    if (!formValues.email.trim()) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        email: "Email is required",
      }));
      return;
    }

    // Password validation
    if (!formValues.password) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        password: "Password is required",
      }));
      return;
    }

    // Confirm password validation
    if (!formValues.confirmPassword) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        confirmPassword: "Please confirm your password",
      }));
      return;
    }

    // Password matching
    if (formValues.password !== formValues.confirmPassword) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        confirmPassword: "Passwords do not match",
      }));
      return;
    }

    // API call only after validation is successful
    const result = await dispatch(
      register({
        name: formValues.name.trim(),
        email: formValues.email.trim(),
        password: formValues.password,
      }),
    );
    if (register.fulfilled.match(result)) {
      navigate("/login", { state: { registered: true } });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
    // Remove error while typing
    setFormErrors((prevValues) => ({
      ...prevValues,
      [name]: "",
    }));
  };

  return (
    <div className={styles["outer-container"]}>
      <div className="w-100">
        {/* Heading */}
        <div className="d-flex justify-content-center">
          <div className="fs-2 fw-bold mb-2 text-info">Sign Up To Todo App</div>
        </div>
        {registerError && <div role="alert">{registerError}</div>}

        {/* Name */}
        <Input
          inputRef={inputRef}
          name="name"
          value={formValues.name}
          type="text"
          placeholder="Your name..."
          handleInputChange={handleInputChange}
          error={formErrors.name}
        />

        {/* Email */}
        <Input
          name="email"
          value={formValues.email}
          type="email"
          placeholder="Your email..."
          handleInputChange={handleInputChange}
          error={formErrors.email}
        />

        {/* Password */}
        <Input
          name="password"
          value={formValues.password}
          type="password"
          placeholder="Your password..."
          handleInputChange={handleInputChange}
          error={formErrors.password}
        />

        {/* Confirm Password */}
        <Input
          name="confirmPassword"
          value={formValues.confirmPassword}
          type="password"
          placeholder="Confirm your password..."
          handleInputChange={handleInputChange}
          error={formErrors.confirmPassword}
        />

        <div className="d-flex justify-content-between mt-3">
          <div>
            <Link to="/login">
              <span>Already User?</span>
            </Link>
          </div>

          <div>
            <Button
              className="btn btn-primary"
              handleClick={handleSubmit}
              disabled={loading}
              buttonText={loading ? "Registering..." : "Register"}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
