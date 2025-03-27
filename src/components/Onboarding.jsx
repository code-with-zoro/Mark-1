// src/components/Onboarding.jsx
import React, { useState, useContext } from 'react';
import { UserContext } from '../context/UserContext'; // Adjust the import path if necessary
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Onboarding = () => {
  const { setUser  } = useContext(UserContext);
  const [name, setName] = useState('');
  const [domain, setDomain] = useState('');
  const navigate = useNavigate(); // Initialize useNavigate

  const handleSubmit = (e) => {
    e.preventDefault();
    setUser ({ name, domain });
    navigate('/profile'); // Redirect to the profile page after onboarding
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <h1 className="text-2xl font-bold mb-4">Welcome to Student Connect</h1>
      <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow-md">
        <input
          type="text"
          placeholder="Your Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        />
        <select
          value={domain}
          onChange={(e) => setDomain(e.target.value)}
          className="border p-2 mb-4 w-full"
          required
        >
          <option value="">Select Your Domain</option>
          <option value="CSE">Computer Science</option>
          <option value="CA">Chartered Accountancy</option>
          {/* Add more domains as needed */}
        </select>
        <button type="submit" className="bg-blue-500 text-white p-2 rounded w-full">
          Get Started
        </button>
      </form>
    </div>
  );
};

export default Onboarding;