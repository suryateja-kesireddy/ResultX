import React, { useState } from "react";

const PasswordInput = React.forwardRef(
  ({ label, error, id, ...props }, ref) => {
    const [showPassword, setShowPassword] = useState(false);

    const inputId = id || props.name;

    return (
      <div className="input-group">
        <label htmlFor={inputId}>{label}</label>

        <div className="password-wrapper">
          <input
            id={inputId}
            ref={ref}
            type={showPassword ? "text" : "password"}
            className={error ? "input-error" : ""}
            aria-invalid={!!error}
            aria-describedby={error ? `${inputId}-error` : undefined}
            {...props}
          />

          <button
            type="button"
            className="toggle-password"
            onClick={() => setShowPassword((prev) => !prev)}
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? "Hide" : "Show"}
          </button>
        </div>

        {error && (
          <p
            id={`${inputId}-error`}
            className="error-text"
          >
            {error.message}
          </p>
        )}
      </div>
    );
  }
);

PasswordInput.displayName = "PasswordInput";

export default PasswordInput;