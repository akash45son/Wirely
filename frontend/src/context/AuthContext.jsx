import { createContext, useEffect, useState } from "react";
import { getProfile } from "../services/authService";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  const [loading, setLoading] =
    useState(true);

  const loadUser = async () => {
    try {
      const token =
        localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      const data = await getProfile();

      setUser(data.user);
    } catch (error) {
      console.error(error);

      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

 const login = async (token) => {
  localStorage.setItem("token", token);

  await loadUser();
};

const logout = () => {
  localStorage.removeItem("token");

  setUser(null);
};

  return (
    <AuthContext.Provider
value={{
  user,
  setUser,
  loading,
  login,
  logout,
  loadUser
}}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;