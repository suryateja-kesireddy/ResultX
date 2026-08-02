import React from "react";

const Checkbox = React.forwardRef(
  ({ label, ...props }, ref) => {
    return (
      <label
        style={{
          display: "flex",
          alignItems: "center",
          gap: "10px",
          cursor: "pointer",
          userSelect: "none",
        }}
      >
        <input
          ref={ref}
          type="checkbox"
          {...props}
          style={{
            width: "18px",
            height: "18px",
            accentColor: "#2563EB",
            cursor: "pointer",
            flexShrink: 0,
          }}
        />

        <span>{label}</span>
      </label>
    );
  }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;