require("dotenv").config();

/* REVIEW: This module is the configuration trust boundary. Remediation should
 * validate types/ranges (especially ports and token lifetime), enforce a
 * minimum production JWT secret strength, and distinguish development defaults
 * from required production settings. */
const requiredEnvVariables = [
  "DB_NAME",
  "DB_USER",
  "DB_PASSWORD",
  "DB_HOST",
  "DB_PORT",
  "JWT_SECRET",
  "JWT_EXPIRES_IN",
];

for (const variable of requiredEnvVariables) {
  if (!process.env[variable]) {
    throw new Error(`Missing required environment variable: ${variable}`);
  }
}

module.exports = {
  PORT: Number(process.env.PORT) || 5000,

  DB_NAME: process.env.DB_NAME,
  DB_USER: process.env.DB_USER,
  DB_PASSWORD: process.env.DB_PASSWORD,
  DB_HOST: process.env.DB_HOST,
  DB_PORT: Number(process.env.DB_PORT),

  JWT_SECRET: process.env.JWT_SECRET,
  JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN,
};