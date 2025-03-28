import { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Load user from localStorage on init
  useEffect(() => {
    const storedUser = localStorage.getItem('mark1_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        localStorage.removeItem('mark1_user');
      }
    }
    setIsAuthChecked(true);
  }, []);

  // Persist user to localStorage
  useEffect(() => {
    if (user) {
      localStorage.setItem('mark1_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mark1_user');
    }
  }, [user]);

  const login = async (email, password) => {
    // Mock login - replace with real API call
    const mockUser = {
      id: 'mock-user-123',
      email,
      name: email.split('@')[0],
      domain: 'CSE',
      avatar: `https://i.pravatar.cc/150?u=${email}`
    };
    setUser(mockUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    navigate('/signin');
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthChecked,
        login,
        logout
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};