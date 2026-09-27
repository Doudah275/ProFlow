const app = require("./app");
const sequelize = require("./config/database");
const { PORT } = require("./config/env");

// Load models and their relationships
require("./models");

const startServer = async () => {
  try {
    // Test database connection
    await sequelize.authenticate();

    console.log("Database connection established successfully.");

    // REVIEW: sequelize.sync() can mutate schema at startup and is risky for
    // production deploys. Use versioned migrations and a deliberate rollout.
    await sequelize.sync();

    app.listen(PORT, () => {
      console.log(`ProFlow API running on port ${PORT}`);
    });
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();