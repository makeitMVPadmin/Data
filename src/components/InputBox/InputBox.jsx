import React from "react";

const InputBox = ({ value, className, onChange, placeholder, ...rest }) => {
  return (
    <textarea
      className={`input ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      {...rest}
    />
  );
};

export default InputBox;
