import { createContext, useContext, useState } from "react";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || {}
  );
  const [token, setToken] = useState(localStorage.getItem("token") || "");

  const login = (email, token) => {
    localStorage.setItem("user", JSON.stringify({ email }));
    localStorage.setItem("token", token);
    setToken(token);
    setUser({ email });
  };

  const logout = () => {
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setToken("");
    setUser({});
  };
  return (
    <AuthContext.Provider value={{ login, logout, user, token }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

export const useAuth = () => useContext(AuthContext);
