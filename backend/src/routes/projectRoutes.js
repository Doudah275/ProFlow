const express = require("express");

const {
  createProject,
  getAllProjects,
  getProjectById,
  updateProject,
  deleteProject,
} = require("../controllers/projectController");

const authMiddleware = require("../middlewares/authMiddleware");
const validateProject = require("../validators/projectValidator");

// REVIEW: Route middleware protects authentication and basic project shape;
// verify authorization/ownership and complete-vs-partial update semantics in
// integration tests for every verb.
const router = express.Router();

// All project routes require authentication
router.use(authMiddleware);

// Create project
router.post(
  "/",
  validateProject,
  createProject
);

// Get all projects
router.get("/", getAllProjects);

// Get project by ID
router.get("/:id", getProjectById);

// Update project
router.put(
  "/:id",
  validateProject,
  updateProject
);

// Delete project
router.delete("/:id", deleteProject);

module.exports = router;