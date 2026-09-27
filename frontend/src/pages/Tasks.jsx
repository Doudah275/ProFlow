import { useEffect, useState } from "react";

import api from "../config/api";
import TaskForm from "../components/TaskForm";

import "./style/Tasks.css";

/* REVIEW: This page duplicates the Projects CRUD orchestration and also relies
 * on server-side task validation that is currently absent. Add a shared data
 * pattern plus tests for invalid IDs, missing relationships, and stale loads.
 */
const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [projects, setProjects] = useState([]);

  const [loading, setLoading] = useState(true);
  const [formLoading, setFormLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState(null);

  // Fetch tasks and projects required by the page.
  const fetchData = async () => {
    try {
      // REVIEW: Promise.all has all-or-nothing failure semantics; provide retry
      // and cancellation behavior before this becomes a larger data workflow.
      setLoading(true);
      setError("");

      // The Axios interceptor automatically adds the JWT token.
      const [tasksResponse, projectsResponse] =
        await Promise.all([
          api.get("/tasks"),
          api.get("/projects"),
        ]);

      setTasks(tasksResponse.data.data);
      setProjects(projectsResponse.data.data);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to load tasks."
      );
    } finally {
      setLoading(false);
    }
  };

  // Load data when the page opens.
  useEffect(() => {
    fetchData();
  }, []);

  // Create a new task.
  const handleCreateTask = async (formData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      const response = await api.post("/tasks", formData);

      setTasks((previousTasks) => [
        response.data.data,
        ...previousTasks,
      ]);

      setSuccess("Task created successfully.");
      setShowForm(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to create task."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Update an existing task.
  const handleUpdateTask = async (formData) => {
    try {
      setFormLoading(true);
      setError("");
      setSuccess("");

      const response = await api.put(
        `/tasks/${editingTask.id}`,
        formData
      );

      setTasks((previousTasks) =>
        previousTasks.map((task) =>
          task.id === editingTask.id
            ? response.data.data
            : task
        )
      );

      setSuccess("Task updated successfully.");
      setEditingTask(null);
      setShowForm(false);
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to update task."
      );
    } finally {
      setFormLoading(false);
    }
  };

  // Delete an existing task.
  const handleDelete = async (taskId) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this task?"
    );

    if (!confirmed) {
      return;
    }

    try {
      setError("");
      setSuccess("");

      await api.delete(`/tasks/${taskId}`);

      setTasks((previousTasks) =>
        previousTasks.filter(
          (task) => task.id !== taskId
        )
      );

      setSuccess("Task deleted successfully.");
    } catch (error) {
      setError(
        error.response?.data?.message ||
          "Failed to delete task."
      );
    }
  };

  // Open the form for creating a new task.
  const openCreateForm = () => {
    setEditingTask(null);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // Open the form for editing an existing task.
  const openEditForm = (task) => {
    setEditingTask(task);
    setShowForm(true);
    setError("");
    setSuccess("");
  };

  // Close the create/edit form.
  const closeForm = () => {
    setEditingTask(null);
    setShowForm(false);
  };

  // Format task status for display.
  const formatStatus = (status) => {
    return status
      .replaceAll("_", " ")
      .toLowerCase()
      .replace(/\b\w/g, (character) =>
        character.toUpperCase()
      );
  };

  // Format task priority for display.
  const formatPriority = (priority) => {
    return (
      priority.charAt(0).toUpperCase() +
      priority.slice(1).toLowerCase()
    );
  };

  // Loading state.
  if (loading) {
    return (
      <main className="tasks-page">
        <div className="tasks-loading">
          <span className="tasks-spinner"></span>
          <p>Loading tasks...</p>
        </div>
      </main>
    );
  }

  return (
    <main className="tasks-page">
      {/* Page Header */}
      <section className="tasks-header">
        <div>
          <span className="tasks-eyebrow">
            Management
          </span>

          <h1>Tasks</h1>

          <p>
            Track your tasks and stay on top of your
            project work.
          </p>
        </div>

        {!showForm && (
          <button
            type="button"
            className="tasks-add-button"
            onClick={openCreateForm}
          >
            <span>+</span>
            Add Task
          </button>
        )}
      </section>

      {/* Success Message */}
      {success && (
        <div
          className="tasks-message tasks-message-success"
          role="status"
        >
          {success}
        </div>
      )}

      {/* Error Message */}
      {error && (
        <div
          className="tasks-message tasks-message-error"
          role="alert"
        >
          {error}
        </div>
      )}

      {/* Create / Edit Form */}
      {showForm && (
        <section className="tasks-form-section">
          <div className="tasks-form-header">
            <div>
              <span className="tasks-form-eyebrow">
                {editingTask ? "Update" : "New Task"}
              </span>

              <h2>
                {editingTask
                  ? "Edit Task"
                  : "Create Task"}
              </h2>
            </div>

            <button
              type="button"
              className="tasks-close-button"
              onClick={closeForm}
              disabled={formLoading}
              aria-label="Close task form"
            >
              ×
            </button>
          </div>

          <TaskForm
            task={editingTask}
            projects={projects}
            onSubmit={
              editingTask
                ? handleUpdateTask
                : handleCreateTask
            }
            onCancel={closeForm}
            loading={formLoading}
          />
        </section>
      )}

      {/* Tasks List */}
      <section className="tasks-section">
        <div className="tasks-section-header">
          <div>
            <h2>Task List</h2>

            <p>
              {tasks.length}{" "}
              {tasks.length === 1
                ? "task"
                : "tasks"}{" "}
              in your workspace
            </p>
          </div>
        </div>

        {tasks.length === 0 ? (
          <div className="tasks-empty">
            <div className="tasks-empty-icon">T</div>

            <h3>No tasks yet</h3>

            <p>
              Start by creating your first task for
              one of your projects.
            </p>

            <button
              type="button"
              onClick={openCreateForm}
            >
              + Create Your First Task
            </button>
          </div>
        ) : (
          <div className="tasks-grid">
            {tasks.map((task) => (
              <article
                className="task-card"
                key={task.id}
              >
                {/* Card Header */}
                <div className="task-card-header">
                  <div className="task-card-title">
                    <h3>{task.title}</h3>

                    {task.project && (
                      <span className="task-project">
                        {task.project.name}
                      </span>
                    )}
                  </div>
                </div>

                {/* Description */}
                {task.description && (
                  <p className="task-description">
                    {task.description}
                  </p>
                )}

                {/* Task Metadata */}
                <div className="task-meta">
                  <div className="task-meta-item">
                    <span className="task-meta-label">
                      Status
                    </span>

                    <span
                      className={`task-badge task-status-${task.status.toLowerCase()}`}
                    >
                      {formatStatus(task.status)}
                    </span>
                  </div>

                  <div className="task-meta-item">
                    <span className="task-meta-label">
                      Priority
                    </span>

                    <span
                      className={`task-badge task-priority-${task.priority.toLowerCase()}`}
                    >
                      {formatPriority(task.priority)}
                    </span>
                  </div>

                  {task.dueDate && (
                    <div className="task-meta-item">
                      <span className="task-meta-label">
                        Due Date
                      </span>

                      <span className="task-meta-value">
                        {task.dueDate}
                      </span>
                    </div>
                  )}
                </div>

                {/* Actions */}
                <div className="task-card-actions">
                  <button
                    type="button"
                    className="task-edit-button"
                    onClick={() =>
                      openEditForm(task)
                    }
                  >
                    Edit
                  </button>

                  <button
                    type="button"
                    className="task-delete-button"
                    onClick={() =>
                      handleDelete(task.id)
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

export default Tasks;