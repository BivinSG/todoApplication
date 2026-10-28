import { memo } from "react";

const Button = memo(({ className, buttonText, handleClick, disabled = false }) => {
  return (
    <button
      className={className || "btn btn-primary"}
      onClick={handleClick}
      disabled={disabled}
    >
      {buttonText}
    </button>
  );
});

export default Button;
