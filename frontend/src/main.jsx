import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./index.css"

import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext.jsx";

// REVIEW: Add a top-level error boundary and verify provider composition in a
// render test so an uncaught page error does not blank the entire application.
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>
);
