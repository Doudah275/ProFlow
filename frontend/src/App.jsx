import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Clients from "./pages/Clients";
import Projects from "./pages/Projects";
import Tasks from "./pages/Tasks";

/*
 * AUDIT PLAN
 * Scope: route protection, authentication/state flow, API boundaries,
 * form validation, loading/error states, readability, conventions, and
 * test coverage across the frontend. Trace user actions from route entry
 * through context, service, request, and rendered state; record findings
 * as comments only. No behavior or build artifact is changed in this pass.
 */
const App = () => {
  return (
    <BrowserRouter>
      <Navbar />

        {/* REVIEW: Consider an explicit authenticated redirect for public pages
          and a route-level error boundary so failed lazy/data views do not
          collapse into the catch-all login route. */}
      <Routes>
        {/* Public routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* Protected routes */}
        {/* REVIEW: Authentication is enforced here, but authorization by role
          is not represented in the route tree; confirm that this is a
          deliberate server-only policy. */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/clients" element={<Clients />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/tasks" element={<Tasks />} />
        </Route>

        {/* Default route */}
        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;