import { useEffect, useState } from "react";

import api from "../config/api";
import ProjectForm from "../components/ProjectForm";

import "./style/Projects.css";

/* REVIEW: Promise.all couples project rendering to client loading: one failed
 * request hides both datasets. Decide whether partial data, retry actions, and
 * a shared resource hook would make failure states clearer and less duplicated.
 */
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [clients, setClients] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Fetch projects and clients when the page loads.
  const fetchData = async () => {
    try {
      // REVIEW: Cancel or ignore stale requests on unmount and centralize the
      // repeated Axios error-to-message mapping used by all CRUD pages.
      setLoading(true);
      setError("");

      // The Axios interceptor automatically adds the JWT token.
      const [projectsResponse, clientsResponse] =
        await Promise.all([
          api.get("/projects"),
          api.get("/clients"),
        ]);

      setProjects(projectsResponse.data.data);
      setClients(clientsResponse.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load projects."
      );
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // Create a new project.
  const handleCreateProject = async (formData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      const response = await api.post(
        "/projects",
        formData
      );

      // Add the new project to the beginning of the list.
      setProjects((previousProjects) => [
        response.data.data,
        ...previousProjects,
      ]);

      setSuccess("Project created successfully.");
      setShowForm(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create project."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Update an existing project.
  const handleUpdateProject = async (formData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        `/projects/${editingProject.id}`,
        formData
      );

      // Replace the updated project in the current list.
      setProjects((previousProjects) =>
        previousProjects.map((project) =>
          project.id === editingProject.id
            ? response.data.data
            : project
        )
      );

      setSuccess("Project updated successfully.");
      setEditingProject(null);
      setShowForm(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update project."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Delete a project after user confirmation.
  const handleDelete = async (projectId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this project?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(`/projects/${projectId}`);

      // Remove the deleted project from the current list.
      setProjects((previousProjects) =>
        previousProjects.filter(
          (project) => project.id !== projectId
        )
      );

      setSuccess("Project deleted successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete project."
      );
    }
  };

  const openCreateForm = () => {
    setEditingProject(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const openEditForm = (project) => {
    setEditingProject(project);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  const closeForm = () => {
    setEditingProject(null);
    setShowForm(false);
  };

  // Display a loading state while the initial data is loading.
  if (loading) {
    return (
      <main className="projects-page">
        <div className="projects-loading">
          <span className="projects-spinner"></span>
          <p>Loading projects...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="projects-page">
      {/* Page header */}
      <section className="projects-header">
        <div>
          <span className="projects-eyebrow">
            Management
          </span>

          <h1>Projects</h1>

          <p>
            Organize your projects and monitor their progress.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="projects-add-button"
            onClick={openCreateForm}
          >
            <span>+</span>
            Add Project
          </button>
        )}
      </section>

      {/* Success message */}
      {success && (
        <div className="projects-message projects-message-success">
          {success}
        </div>
      )}

      {/* Error message */}
      {error && (
        <div
          className="projects-message projects-message-error"
          role="alert"
          aria-live="polite"
        >
          {error}
        </div>
      )}

      {/* Create / Edit form */}
      {showForm && (
        <section className="projects-form-section">
          <div className="projects-form-header">
            <div>
              <span className="projects-form-eyebrow">
                {editingProject
                  ? "Update"
                  : "New Project"}
              </span>

              <h2>
                {editingProject
                  ? "Edit Project"
                  : "Create Project"}
              </h2>
            </div>

            <button
              type="button"
              className="projects-close-button"
              onClick={closeForm}
              disabled={formLoading}
              aria-label="Close project form"
            >
              ×
            </button>
          </div>

          <ProjectForm
            project={editingProject}
            clients={clients}
            onSubmit={
              editingProject
                ? handleUpdateProject
                : handleCreateProject
            }
            onCancel={closeForm}
            loading={formLoading}
          />
        </section>
      )}

      {/* Projects list */}
      <section className="projects-section">
        <div className="projects-section-header">
          <div>
            <h2>Project List</h2>

            <p>
              {projects.length}{" "}
              {projects.length === 1
                ? "project"
                : "projects"}{" "}
              in your workspace
            </p>
          </div>
        </div>

        {projects.length === 0 ? (
          <div className="projects-empty">
            <div className="projects-empty-icon">P</div>

            <h3>No projects yet</h3>

            <p>
              Start by creating your first project for your
              workspace.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
            >
              + Create Your First Project
            </button>
          </div>
        ) : (
          <div className="projects-grid">
            {projects.map((project) => (
              <article
                className="project-card"
                key={project.id}
              >
                <div className="project-card-header">
                  <div className="project-icon">P</div>

                  <div className="project-card-title">
                    <h3>{project.name}</h3>

                    {project.client?.name && (
                      <span>
                        {project.client.name}
                      </span>
                    )}
                  </div>
                </div>

                {project.description && (
                  <p className="project-description">
                    {project.description}
                  </p>
                )}

                <div className="project-card-info">
                  <div className="project-info-row">
                    <span>Status</span>

                    <span
                      className={`project-status project-status-${project.status?.toLowerCase()}`}
                    >
                      {project.status}
                    </span>
                  </div>

                  {project.startDate && (
                    <div className="project-info-row">
                      <span>Start date</span>
                      <strong>
                        {project.startDate}
                      </strong>
                    </div>
                  )}

                  {project.endDate && (
                    <div className="project-info-row">
                      <span>End date</span>
                      <strong>
                        {project.endDate}
                      </strong>
                    </div>
                  )}

                  {project.client?.name && (
                    <div className="project-info-row">
                      <span>Client</span>
                      <strong>
                        {project.client.name}
                      </strong>
                    </div>
                  )}
                </div>

                <div className="project-card-actions">
                  <button
                    type="button"
                    className="project-edit-button"
                    onClick={() =>
                      openEditForm(project)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="project-delete-button"
                    onClick={() =>
                      handleDelete(project.id)
                    }
                  >
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
};

export default Projects;