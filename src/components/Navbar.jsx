import { useState } from "react";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <nav className="bg-gray-900 text-white p-4 shadow-lg">
      {/* Desktop Nav */}
      <div className="container mx-auto flex justify-between items-center">
        <a href="/" className="text-2xl font-bold text-green-400">Mark-1</a>
        
        {/* Mobile Menu Button */}
        <button 
          className="md:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          ☰
        </button>

        {/* Desktop Links (hidden on mobile) */}
        <div className="hidden md:flex space-x-6">
          <a href="/" className="hover:text-green-400 transition-colors">Home</a>
          <a href="/signin" className="hover:text-green-400 transition-colors">Sign In</a>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className="md:hidden flex flex-col space-y-3 p-4 bg-gray-800">
          <a href="/" className="hover:text-green-400">Home</a>
          <a href="/signin" className="hover:text-green-400">Sign In</a>
        </div>
      )}
    </nav>
  );
}
