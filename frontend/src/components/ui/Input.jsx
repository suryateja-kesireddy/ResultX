import React from "react";
import { User } from "lucide-react";

const Input = React.forwardRef(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="input-group">
        <label htmlFor={inputId}>
          {label}
        </label>

        <div className="input-wrapper">

          <User
            size={20}
            className="input-icon"
          />

          <input
            id={inputId}
            ref={ref}
            className={error ? "input-error" : ""}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${inputId}-error`
                : undefined
            }
            {...props}
          />

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

Input.displayName = "Input";

export default Input;