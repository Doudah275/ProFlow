const projectService = require("../services/projectService");
const {
  successResponse,
} = require("../utils/response");

// REVIEW: Add contract tests for ownership-safe 404s, validation failures, and
// response envelopes so controller behavior stays consistent across resources.
const createProject = async (req, res, next) => {
  try {
    const project = await projectService.createProject(
      req.body,
      req.user.id
    );

    return successResponse(
      res,
      201,
      project,
      "Project created successfully"
    );
  } catch (error) {
    next(error);
  }
};

const getAllProjects = async (req, res, next) => {
  try {
    const projects = await projectService.getAllProjects(
      req.user.id
    );

    return successResponse(
      res,
      200,
      projects,
      "Projects retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

const getProjectById = async (req, res, next) => {
  try {
    const project = await projectService.getProjectById(
      req.params.id,
      req.user.id
    );

    return successResponse(
      res,
      200,
      project,
      "Project retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

const updateProject = async (req, res, next) => {
  try {
    const project = await projectService.updateProject(
      req.params.id,
      req.body,
      req.user.id
    );

    return successResponse(
      res,
      200,
      project,
      "Project updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteProject = async (req, res, next) => {
  try {
    const result = await projectService.deleteProject(
      req.params.id,
      req.user.id
    );

    return successResponse(
      res,
      200,
      null,
      result.message
    );
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
};