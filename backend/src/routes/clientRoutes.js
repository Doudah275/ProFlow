const express = require("express");

const {
  createClient,
  getAllClients,
  getClientById,
  updateClient,
  deleteClient,
} = require("../controllers/clientController");

const authMiddleware = require("../middlewares/authMiddleware");
const validateClient = require("../validators/clientValidator");

// REVIEW: Authentication is applied consistently here; add route-level tests
// for ownership, invalid IDs, validation failures, and unknown endpoints.
const router = express.Router();

// All client routes require authentication
router.use(authMiddleware);

// Create client
router.post(
  "/",
  validateClient,
  createClient
);

// Get all clients
router.get("/", getAllClients);

// Get client by ID
router.get("/:id", getClientById);

// Update client
router.put(
  "/:id",
  validateClient,
  updateClient
);

// Delete client
router.delete("/:id", deleteClient);

module.exports = router;