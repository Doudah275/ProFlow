const taskService = require("../services/taskService");
const {
  successResponse,
} = require("../utils/response");

// REVIEW: These handlers mirror the other resource controllers; consider a
// shared async-handler convention only if it reduces duplication without
// obscuring route-specific behavior.
const createTask = async (req, res, next) => {
  try {
    const task = await taskService.createTask(
      req.body,
      req.user.id
    );

    return successResponse(
      res,
      201,
      task,
      "Task created successfully"
    );
  } catch (error) {
    next(error);
  }
};

const getAllTasks = async (req, res, next) => {
  try {
    const tasks = await taskService.getAllTasks(
      req.user.id
    );

    return successResponse(
      res,
      200,
      tasks,
      "Tasks retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

const getTaskById = async (req, res, next) => {
  try {
    const task = await taskService.getTaskById(
      req.params.id,
      req.user.id
    );

    return successResponse(
      res,
      200,
      task,
      "Task retrieved successfully"
    );
  } catch (error) {
    next(error);
  }
};

const updateTask = async (req, res, next) => {
  try {
    const task = await taskService.updateTask(
      req.params.id,
      req.body,
      req.user.id
    );

    return successResponse(
      res,
      200,
      task,
      "Task updated successfully"
    );
  } catch (error) {
    next(error);
  }
};

const deleteTask = async (req, res, next) => {
  try {
    const result = await taskService.deleteTask(
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
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
};