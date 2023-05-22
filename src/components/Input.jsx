import React from "react";

const Input = ({ type, label, value, setValue }) => {
  return (
    <div className="form-floating">
      {type === "file" ? (
        <input
          id="image"
          type={type}
          className="form-control p-3"
          placeholder={label}
          accept="image/*"
          onChange={(e) => setValue(e.target)}
        />
      ) : (
        <input
          type={type}
          className="form-control"
          placeholder={label}
          value={value}
          onChange={(e) => setValue(e.target.value)}
        />
      )}
      <label>{label}</label>
    </div>
  );
};

export default Input;
