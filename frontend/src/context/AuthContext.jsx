import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import { login as loginRequest } from "../services/authService";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [authState, setAuthState] = useState({
    user: null,
    token: null,
    isAuthenticated: false,
    isLoading: true,
  });

  // Restore the authentication state when the application starts.
  useEffect(() => {
    const token = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (token && storedUser) {
      try {
        const user = JSON.parse(storedUser);

        setAuthState({
          user,
          token,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch (error) {
        console.error(
          "Failed to restore authentication state:",
          error
        );

        localStorage.removeItem("token");
        localStorage.removeItem("user");

        setAuthState({
          user: null,
          token: null,
          isAuthenticated: false,
          isLoading: false,
        });
      }
    } else {
      setAuthState((previousState) => ({
        ...previousState,
        isLoading: false,
      }));
    }
  }, []);

  const login = async (credentials) => {
    const response = await loginRequest(credentials);

    // authService.login() returns response.data.
    // Therefore, the API payload is available in response.data.
    const { user, token } = response.data;

    localStorage.setItem("token", token);
    localStorage.setItem("user", JSON.stringify(user));

    setAuthState({
      user,
      token,
      isAuthenticated: true,
      isLoading: false,
    });

    return response;
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");

    setAuthState({
      user: null,
      token: null,
      isAuthenticated: false,
      isLoading: false,
    });
  };

  return (
    <AuthContext.Provider
      value={{
        authState,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error(
      "useAuth must be used inside an AuthProvider"
    );
  }

  return context;
};