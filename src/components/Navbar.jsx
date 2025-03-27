import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-[var(--color-primary)] text-white py-4 px-6 flex justify-between items-center shadow-md">
      <h1 className="text-lg font-bold">Mark-1</h1>
      <div className="space-x-4">
        <Link to="/" className="hover:text-[var(--color-secondary)] transition-all duration-300">Home</Link>
        <Link to="/about" className="hover:text-[var(--color-secondary)] transition-all duration-300">About</Link>
        <Link to="/contact" className="hover:text-[var(--color-secondary)] transition-all duration-300">Contact</Link>
      </div>
    </nav>
  );
};

export default Navbar;
