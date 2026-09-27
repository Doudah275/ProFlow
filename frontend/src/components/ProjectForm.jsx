import { useEffect, useState } from "react";

import "./style/ProjectForm.css";

/* REVIEW: Convert the select value back to Number without checking for an empty
 * or invalid value. Add client-side date ordering and identifier checks while
 * retaining server validation as the source of truth. */
const ProjectForm = ({
  project = null,
  clients = [],
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    status: "PLANNING",
    startDate: "",
    endDate: "",
    clientId: "",
  });

  // Fill the form when editing an existing project.
  useEffect(() => {
    if (project) {
      setFormData({
        name: project.name || "",
        description: project.description || "",
        status: project.status || "PLANNING",
        startDate: project.startDate || "",
        endDate: project.endDate || "",
        clientId: project.clientId
          ? String(project.clientId)
          : "",
      });
    } else {
      // Reset the form when creating a new project.
      setFormData({
        name: "",
        description: "",
        status: "PLANNING",
        startDate: "",
        endDate: "",
        clientId: "",
      });
    }
  }, [project]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // REVIEW: Disable all editable controls consistently during submission and
    // ensure the parent handles rejected promises without leaving stale state.
    await onSubmit({
      ...formData,
      clientId: Number(formData.clientId),
    });
  };

  return (
    <form className="project-form" onSubmit={handleSubmit}>
      {/* Project name */}
      <div className="project-form-group project-form-group-full">
        <label htmlFor="project-name">Project Name</label>

        <input
          id="project-name"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Enter project name"
          autoComplete="off"
          required
        />
      </div>

      {/* Project description */}
      <div className="project-form-group project-form-group-full">
        <label htmlFor="project-description">
          Description
        </label>

        <textarea
          id="project-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the project..."
          rows="4"
        />
      </div>

      {/* Project status */}
      <div className="project-form-group">
        <label htmlFor="project-status">Status</label>

        <select
          id="project-status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="PLANNING">Planning</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
          <option value="CANCELLED">Cancelled</option>
        </select>
      </div>

      {/* Client selection */}
      <div className="project-form-group">
        <label htmlFor="project-client">
          Client
        </label>

        <select
          id="project-client"
          name="clientId"
          value={formData.clientId}
          onChange={handleChange}
          required
        >
          <option value="">Select a client</option>

          {clients.map((client) => (
            <option key={client.id} value={client.id}>
              {client.name}
            </option>
          ))}
        </select>
      </div>

      {/* Start date */}
      <div className="project-form-group">
        <label htmlFor="project-start-date">
          Start Date
        </label>

        <input
          id="project-start-date"
          type="date"
          name="startDate"
          value={formData.startDate}
          onChange={handleChange}
        />
      </div>

      {/* End date */}
      <div className="project-form-group">
        <label htmlFor="project-end-date">
          End Date
        </label>

        <input
          id="project-end-date"
          type="date"
          name="endDate"
          value={formData.endDate}
          onChange={handleChange}
        />
      </div>

      {/* Form actions */}
      <div className="project-form-actions">
        <button
          type="submit"
          className="project-form-submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : project
              ? "Update Project"
              : "Create Project"}
        </button>

        {project && (
          <button
            type="button"
            className="project-form-cancel"
            onClick={onCancel}
            disabled={loading}
          >
            Cancel
          </button>
        )}
      </div>
    </form>
  );
};

export default ProjectForm;