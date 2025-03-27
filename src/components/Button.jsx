import React from "react";

const Button = ({ children, onClick, className = "" }) => {
  return (
    <button
      onClick={onClick}
      className={`bg-[var(--color-primary)] text-white px-4 py-2 rounded-md shadow-md hover:bg-[var(--color-secondary)] transition-all duration-300 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;
