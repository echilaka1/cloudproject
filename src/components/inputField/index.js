import React from "react";
import "./index.css";

const InputField = ({ onChange, ...props }) => {
  return <input onChange={onChange} className="input-class" {...props} />;
};

export default InputField;
