import { useEffect, useState } from "react";

import "./style/TaskForm.css";

/* REVIEW: Task creation has no matching backend validator yet. Add explicit
 * title/date/enum/relationship checks and verify Number conversion before the
 * request boundary; test edit reset and rejected submission paths. */
const TaskForm = ({
  task = null,
  projects = [],
  onSubmit,
  onCancel,
  loading = false,
}) => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    status: "TODO",
    priority: "MEDIUM",
    dueDate: "",
    projectId: "",
  });

  // Fill the form when editing an existing task.
  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || "",
        description: task.description || "",
        status: task.status || "TODO",
        priority: task.priority || "MEDIUM",
        dueDate: task.dueDate || "",
        projectId: task.projectId
          ? String(task.projectId)
          : "",
      });
    } else {
      // Reset the form when creating a new task.
      setFormData({
        title: "",
        description: "",
        status: "TODO",
        priority: "MEDIUM",
        dueDate: "",
        projectId: "",
      });
    }
  }, [task]);

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData((previousData) => ({
      ...previousData,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    // REVIEW: A blank selection becomes NaN here; the API should receive a
    // validated identifier or a deliberate client-side error state.
    await onSubmit({
      ...formData,
      projectId: Number(formData.projectId),
    });
  };

  return (
    <form className="task-form" onSubmit={handleSubmit}>
      {/* Task title */}
      <div className="task-form-group task-form-group-full">
        <label htmlFor="task-title">Task Title</label>

        <input
          id="task-title"
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Enter task title"
          autoComplete="off"
          required
        />
      </div>

      {/* Task description */}
      <div className="task-form-group task-form-group-full">
        <label htmlFor="task-description">
          Description
        </label>

        <textarea
          id="task-description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Describe the task..."
          rows="4"
        />
      </div>

      {/* Task status */}
      <div className="task-form-group">
        <label htmlFor="task-status">Status</label>

        <select
          id="task-status"
          name="status"
          value={formData.status}
          onChange={handleChange}
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </div>

      {/* Task priority */}
      <div className="task-form-group">
        <label htmlFor="task-priority">Priority</label>

        <select
          id="task-priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </div>

      {/* Due date */}
      <div className="task-form-group">
        <label htmlFor="task-due-date">Due Date</label>

        <input
          id="task-due-date"
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>

      {/* Project selection */}
      <div className="task-form-group">
        <label htmlFor="task-project">Project</label>

        <select
          id="task-project"
          name="projectId"
          value={formData.projectId}
          onChange={handleChange}
          required
        >
          <option value="">Select a project</option>

          {projects.map((project) => (
            <option
              key={project.id}
              value={project.id}
            >
              {project.name}
            </option>
          ))}
        </select>
      </div>

      {/* Form actions */}
      <div className="task-form-actions">
        <button
          type="submit"
          className="task-form-submit"
          disabled={loading}
        >
          {loading
            ? "Saving..."
            : task
              ? "Update Task"
              : "Create Task"}
        </button>

        {task && (
          <button
            type="button"
            className="task-form-cancel"
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

export default TaskForm;