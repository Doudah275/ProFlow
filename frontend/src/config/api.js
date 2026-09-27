import axios from "axios";

/* REVIEW: This is the client request boundary. Document the required
 * VITE_API_URL contract, fail clearly when it is missing, and centralize
 * response normalization plus 401/session-expiry handling here. */
const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Add the JWT token automatically to protected requests
api.interceptors.request.use(
  (config) => {
    // REVIEW: localStorage is readable by any injected script. Reassess token
    // storage and add a coordinated logout/redirect when the API returns 401.
    const token = localStorage.getItem("token");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default api;