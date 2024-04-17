import React from "react";

const InputBox = ({ value, className, onChange, placeholder }) => {
  return (
    <div className={className}>
      <input
        type="text"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
      />
    </div>
  );
};

export default InputBox;
