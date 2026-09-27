import { Navigate, Outlet } from "react-router-dom";

import { useAuth } from "../context/AuthContext";

const ProtectedRoute = () => {
  const { authState } = useAuth();

  // REVIEW: This protects navigation but not authorization by role. Pair it
  // with a defined forbidden state if the backend exposes role-restricted APIs.
  // Wait until authentication state is restored
  if (authState.isLoading) {
    return (
      <main>
        <p>Checking authentication...</p>
      </main>
    );
  }

  // Redirect unauthenticated users to login
  if (!authState.isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;