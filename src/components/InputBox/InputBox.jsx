import React from "react";

const InputBox = ({ value, className, onChange, placeholder }) => {
  return (
    <textarea
      className={className}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
    />
  );
};

export default InputBox;
