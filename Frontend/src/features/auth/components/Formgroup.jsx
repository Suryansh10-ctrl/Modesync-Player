import React from "react";
import "../style/login.scss";

const Formgroup = ({ label, placeholder, value, onChange }) => {
  return (
    <div className="form-group">
      <label htmlFor={label}>{label}</label>

      <input
        type="text"
        id={label}
        name={label}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required
      />
    </div>
  );
};

export default Formgroup;