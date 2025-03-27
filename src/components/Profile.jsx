import React, { useContext } from 'react';
import { UserContext } from '../context/UserContext';

const Profile = () => {
  const { user } = useContext(UserContext); // ✅ Fetch user from context

  return (
    <div className="bg-white p-6 rounded shadow-md text-center">
      <h2 className="text-xl font-bold">{user?.name || "Guest"}</h2>
      <p className="text-gray-600">{user?.domain || "No domain selected"}</p>
    </div>
  );
};

export default Profile;
