const { Task, Project, Client } = require("../models");

const getProjectForUser = async (projectId, userId) => {
  const project = await Project.findOne({
    where: { id: projectId },
    include: [
      {
        model: Client,
        as: "client",
        where: { userId },
      },
    ],
  });

  if (!project) {
    const error = new Error("Project not found");
    error.statusCode = 404;
    throw error;
  }

  return project;
};

const createTask = async (taskData, userId) => {
  // REVIEW: Project ownership is checked, but task fields are not validated or
  // allowlisted here. Add a task DTO/validator before allowing persistence.
  await getProjectForUser(taskData.projectId, userId);

  return await Task.create(taskData);
};

const getAllTasks = async (userId) => {
  return await Task.findAll({
    include: [
      {
        model: Project,
        as: "project",
        required: true,
        include: [
          {
            model: Client,
            as: "client",
            where: { userId },
          },
        ],
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const getTaskById = async (id, userId) => {
  const task = await Task.findOne({
    where: { id },
    include: [
      {
        model: Project,
        as: "project",
        required: true,
        include: [
          {
            model: Client,
            as: "client",
            where: { userId },
          },
        ],
      },
    ],
  });

  if (!task) {
    const error = new Error("Task not found");
    error.statusCode = 404;
    throw error;
  }

  return task;
};

const updateTask = async (id, taskData, userId) => {
  const task = await getTaskById(id, userId);

  if (taskData.projectId) {
    await getProjectForUser(taskData.projectId, userId);
  }

  // REVIEW: Protect this update with field allowlisting and enum/date checks;
  // task routes currently have no request validator at all.
  await task.update(taskData);

  return task;
};

const deleteTask = async (id, userId) => {
  const task = await getTaskById(id, userId);

  await task.destroy();

  return {
    message: "Task deleted successfully",
  };
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};