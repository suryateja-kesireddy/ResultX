import React from "react";

const Checkbox = React.forwardRef(
    ({ label, ...props }, ref) => {
        return (
            <label className="checkbox-container">
                <input
                    ref={ref}
                    type="checkbox"
                    {...props}
                />

                <span className="checkbox-label">
                    {label}
                </span>
            </label>
        );
    }
);

Checkbox.displayName = "Checkbox";

export default Checkbox;