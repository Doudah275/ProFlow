const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

const authMiddleware = require("../middlewares/authMiddleware");
// REVIEW: Add a task validator at this boundary for required title/projectId,
// enum values, date format, and field lengths before service execution.

const router = express.Router();

// All task routes require authentication
router.use(authMiddleware);

// Create task
router.post("/", createTask);

// Get all tasks
router.get("/", getAllTasks);

// Get task by ID
router.get("/:id", getTaskById);

// Update task
router.put("/:id", updateTask);

// Delete task
router.delete("/:id", deleteTask);

module.exports = router;