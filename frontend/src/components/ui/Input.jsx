import React from "react";

const Input = React.forwardRef(
  ({ label, error, id, ...props }, ref) => {
    const inputId = id || props.name;

    return (
      <div className="input-group">
        <label htmlFor={inputId}>{label}</label>

        <input
          id={inputId}
          ref={ref}
          className={error ? "input-error" : ""}
          aria-invalid={!!error}
          aria-describedby={error ? `${inputId}-error` : undefined}
          {...props}
        />

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