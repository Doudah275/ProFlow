import api from "../config/api";

// REVIEW: Keep response-shape assumptions and API error normalization in one
// service boundary so pages do not each depend on Axios internals.
// Register a new user
export const register = async (userData) => {
  const response = await api.post("/auth/register", userData);

  return response.data;
};

// Login an existing user
export const login = async (credentials) => {
  const response = await api.post("/auth/login", credentials);

  return response.data;
};