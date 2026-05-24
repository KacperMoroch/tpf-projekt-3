import React from "react";
import "./Input.css";

const Input = ({
  label,
  type = "text",
  placeholder,
  value,
  onChange,
  name,
  id,
}) => {
  return (
    <div className="input-group">
      {label && (
        <label htmlFor={id || name} className="input-label">
          {label}
        </label>
      )}
      <input
        id={id || name}
        name={name}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className="custom-input"
      />
    </div>
  );
};

export default Input;
