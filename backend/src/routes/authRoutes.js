const express = require("express");

const {
  register,
  login,
} = require("../controllers/authController");

const {
  validateRegister,
  validateLogin,
} = require("../validators/authValidator");

const router = express.Router();

// REVIEW: Add rate limiting, abuse monitoring, and integration coverage around
// these public endpoints; validation alone does not prevent credential attacks.
// Register
router.post(
  "/register",
  validateRegister,
  register
);

// Login
router.post(
  "/login",
  validateLogin,
  login
);

module.exports = router;