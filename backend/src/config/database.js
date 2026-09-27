const { Sequelize } = require("sequelize");

const {
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  DB_HOST,
  DB_PORT,
} = require("./env");

const sequelize = new Sequelize(
  DB_NAME,
  DB_USER,
  DB_PASSWORD,
  {
    // REVIEW: Review dialect-specific TLS, retry, pool, and timeout settings
    // for production rather than relying only on local MySQL connectivity.
    host: DB_HOST,
    port: DB_PORT,
    dialect: "mysql",
    logging: false,

    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000,
    },
  }
);

module.exports = sequelize;