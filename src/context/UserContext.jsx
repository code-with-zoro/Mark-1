// src/UserContext.jsx
import React, { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [posts, setPosts] = useState([]);

  return (
    <UserContext.Provider value={{ user, setUser, posts, setPosts }}>
      {children}
    </UserContext.Provider>
  );
};
