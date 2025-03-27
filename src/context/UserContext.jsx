import { createContext, useState, useContext, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const navigate = useNavigate();

  // Initialize from localStorage
  useEffect(() => {
    const storedUser = localStorage.getItem('mark1_user');
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Failed to parse user data:", error);
        localStorage.removeItem('mark1_user');
      }
    }
    setIsAuthChecked(true);
  }, []);

  // Persist to localStorage when user changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('mark1_user', JSON.stringify(user));
    } else {
      localStorage.removeItem('mark1_user');
    }
  }, [user]);

  const login = async (email, password) => {
    try {
      // Simulate API delay
      await new Promise(resolve => setTimeout(resolve, 800));
      
      // Mock validation
      if (!email || !password) {
        throw new Error("Email and password are required");
      }

      const mockUser = {
        id: `mock-${Math.random().toString(36).substring(2, 9)}`,
        name: email.split('@')[0] || "New User",
        email,
        domain: "Computer Science", // Default domain
        avatar: `https://i.pravatar.cc/150?u=${email}`,
        bio: "",
        isOnboarded: false,
        lastLogin: new Date().toISOString()
      };

      setUser(mockUser);
      return true;
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    }
  };

  const logout = () => {
    setUser(null);
    navigate('/signin');
  };

  const completeOnboarding = (domain, avatar, bio) => {
    if (!user) throw new Error("No user logged in");
    
    const updatedUser = {
      ...user,
      domain,
      avatar: avatar || user.avatar,
      bio,
      isOnboarded: true
    };

    setUser(updatedUser);
    return updatedUser;
  };

  // Add mock data for development
  const addMockData = () => {
    setUser({
      id: "dev-user-123",
      name: "Dev User",
      email: "dev@mark1.com",
      domain: "Computer Science",
      avatar: "https://i.pravatar.cc/150?img=11",
      bio: "Developer testing the platform",
      isOnboarded: true,
      lastLogin: new Date().toISOString()
    });
  };

  return (
    <UserContext.Provider
      value={{
        user,
        isAuthChecked,
        login,
        logout,
        completeOnboarding,
        addMockData // For development only
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