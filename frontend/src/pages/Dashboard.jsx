import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

import "./style/Dashboard.css";

/* REVIEW: This is currently a static navigation dashboard. If counts or recent
 * activity are added, define a data-loading/error boundary rather than growing
 * more global fetches inside this presentational component. */
const Dashboard = () => {
  const { authState } = useAuth();

  const user = authState.user;

  return (
    <main className="dashboard">

      {/* Dashboard Header */}
      <section className="dashboard-header">
        <div>
          <span className="dashboard-eyebrow">
            Overview
          </span>

          <h1>Dashboard</h1>

          <p>
            Welcome back, {user?.name || "User"}! Here's an
            overview of your business.
          </p>
        </div>
      </section>

      {/* Dashboard Cards */}
      <section className="dashboard-cards">

        {/* Clients */}
        <article className="dashboard-card">
          <div className="dashboard-card-icon">
            C
          </div>

          <div className="dashboard-card-content">
            <h2>Clients</h2>

            <p>
              Manage your clients and keep their information
              organized.
            </p>
          </div>

          <Link to="/clients" className="dashboard-card-link">
            View Clients
          </Link>
        </article>

        {/* Projects */}
        <article className="dashboard-card">
          <div className="dashboard-card-icon">
            P
          </div>

          <div className="dashboard-card-content">
            <h2>Projects</h2>

            <p>
              Organize your projects and monitor their progress.
            </p>
          </div>

          <Link to="/projects" className="dashboard-card-link">
            View Projects
          </Link>
        </article>

        {/* Tasks */}
        <article className="dashboard-card">
          <div className="dashboard-card-icon">
            T
          </div>

          <div className="dashboard-card-content">
            <h2>Tasks</h2>

            <p>
              Track your tasks and stay on top of your work.
            </p>
          </div>

          <Link to="/tasks" className="dashboard-card-link">
            View Tasks
          </Link>
        </article>

      </section>

    </main>
  );
};

export default Dashboard;