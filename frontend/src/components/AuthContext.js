import { createContext, useContext, useState } from 'react';

const AuthContext = createContext(); // Create a new context for authentication

// Export a custom hook to use the AuthContext
export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  // Define the current user and user role state variables
  const [currentUser, setCurrentUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  const value = {
    currentUser,
    setCurrentUser,
    userRole,
    setUserRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
