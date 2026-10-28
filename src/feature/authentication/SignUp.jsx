import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";

import Input from "../../Components/Input";
import styles from "./Auth.module.css";
import Button from "../../Components/Button";

import { register } from "./authThunks";
import { useDispatch } from "react-redux";

const SignUp = () => {
  const [formValues, setFormValues] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [formErrors, setFormErrors] = useState({});

  const dispatch = useDispatch();

  const inputRef = useRef(null);

  // Focus on name input when page loads
  useEffect(() => {
    inputRef?.current?.focus();
  }, []);

  const handleSubmit = async () => {
    // Name validation
    if (!formValues.name) {
      setFormErrors((prevValues) => ({
        ...prevValues,
        name: "Name is required",
      }));
      return;
    }

    // Email validation
    if (!formValues.email) {
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
    dispatch(register(formValues));
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

        {/* Name */}
        <Input
          inputRef={inputRef}
          name="name"
          value={formValues.name}
          placeholder="Your name..."
          handleInputChange={handleInputChange}
          error={formErrors.name}
        />

        {/* Email */}
        <Input
          name="email"
          value={formValues.email}
          placeholder="Your email..."
          handleInputChange={handleInputChange}
          error={formErrors.email}
        />

        {/* Password */}
        <Input
          name="password"
          value={formValues.password}
          placeholder="Your password..."
          handleInputChange={handleInputChange}
          error={formErrors.password}
        />

        {/* Confirm Password */}
        <Input
          name="confirmPassword"
          value={formValues.confirmPassword}
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
              buttonText="Register"
            />
          </div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export default SignUp;
