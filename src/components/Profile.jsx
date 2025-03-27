// src/components/Profile.jsx
import React from 'react';

const Profile = ({ user }) => {
  return (
    <div className="bg-white p-6 rounded shadow-md">
      <h2 className="text-xl font-bold">{user.name}</h2>
      <p className="text-gray-600">{user.domain}</p>
    </div>
  );
};

export default Profile;