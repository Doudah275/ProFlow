const jwt = require("jsonwebtoken");
const {
  JWT_SECRET,
} = require("../config/env");

const authMiddleware = (req, res, next) => {
  try {
    // REVIEW: Verification proves token integrity, but the decoded user is
    // never reloaded. Consider checking that the account still exists and is
    // active so logout, deletion, or role changes can take effect promptly.
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({
        success: false,
        message: "Authentication token is required",
      });
    }

    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, JWT_SECRET);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({
      success: false,
      message: "Invalid or expired authentication token",
    });
  }
};

module.exports = authMiddleware;