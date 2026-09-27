const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const clientRoutes = require("./routes/clientRoutes");
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

const errorMiddleware = require("./middlewares/errorMiddleware");

const app = express();

// Set secure HTTP headers
app.use(helmet());

// Enable cross-origin resource sharing
app.use(cors());

// Parse incoming JSON payloads
app.use(express.json());

// Log HTTP requests in development format
app.use(morgan("dev"));

// Health check endpoint
app.get("/", (req, res) => {
  res.status(200).json({
    success: true,
    message: "ProFlow API is running",
  });
});

// Mount feature route modules
app.use("/api/auth", authRoutes);
app.use("/api/clients", clientRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

// Fallback handler for unmatched routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
});

// Centralized error handling middleware
app.use(errorMiddleware);

module.exports = app;