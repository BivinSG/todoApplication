import { memo } from "react";
import styles from "./Input.module.css";

const Input = memo(
  ({ taskRef, name, value, type, placeholder, handleInputChange, error }) => {
    const onChange = (e) => {
      console.log(e.target.value);
    };
    return (
      <div style={{ flex: 1 }}>
        <input
          ref={taskRef}
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleInputChange || onChange}
          className={styles["custom-input"]}
        />

        <div
          style={{
            fontSize: "11px",
            color: "red",
            textAlign: "center",
            height: "15px",
          }}
        >
          {error || ""}
        </div>
      </div>
    );
  },
);

export default Input;
