import { createContext, useContext, useState } from "react";

import {
  getCurrentUser,
  isAuthenticated,
  logout as authLogout,
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authenticated, setAuthenticated] = useState(isAuthenticated());
  const [user, setUser] = useState(getCurrentUser());

  const signIn = () => {
    setAuthenticated(true);
    setUser(getCurrentUser());
  };

  const logout = () => {
    authLogout();
    setAuthenticated(false);
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        authenticated,
        user,
        signIn,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);