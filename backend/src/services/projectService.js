const { Project, Client } = require("../models");

const createProject = async (projectData, userId) => {
  // REVIEW: Ownership is checked before creation, which is good. Also map an
  // explicit project DTO so unrelated request properties are not persisted.
  const { clientId } = projectData;

  const client = await Client.findOne({
    where: {
      id: clientId,
      userId,
    },
  });

  if (!client) {
    const error = new Error("Client not found");
    error.statusCode = 404;
    throw error;
  }

  return await Project.create(projectData);
};

const getAllProjects = async (userId) => {
  return await Project.findAll({
    include: [
      {
        model: Client,
        as: "client",
        where: { userId },
      },
    ],
    order: [["createdAt", "DESC"]],
  });
};

const getProjectById = async (id, userId) => {
  const project = await Project.findOne({
    where: { id },
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

const updateProject = async (id, projectData, userId) => {
  const project = await getProjectById(id, userId);

  if (projectData.clientId) {
    const client = await Client.findOne({
      where: {
        id: projectData.clientId,
        userId,
      },
    });

    if (!client) {
      const error = new Error("Client not found");
      error.statusCode = 404;
      throw error;
    }
  }

  // REVIEW: Validate/allowlist update fields before passing them to Sequelize;
  // this boundary currently accepts the entire request body.
  await project.update(projectData);

  return project;
};

const deleteProject = async (id, userId) => {
  const project = await getProjectById(id, userId);

  await project.destroy();

  return {
    message: "Project deleted successfully",
  };
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};