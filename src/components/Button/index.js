import React from "react";
import "./button.css";

const Button = ({ children, onClick, ...props }) => {
  return (
    <button onClick={onClick} className="button-area" {...props}>
      {children}
    </button>
  );
};

export default Button;
