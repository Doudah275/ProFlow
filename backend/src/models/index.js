const User = require("./User");
const Client = require("./Client");
const Project = require("./Project");
const Task = require("./Task");

/* REVIEW: Associations express navigation and ownership queries, but review
 * database-level foreign keys, indexes, delete behavior, and transaction needs
 * so integrity does not depend only on service-layer checks. */
// =========================
// User ↔ Client
// =========================

User.hasMany(Client, {
  foreignKey: "userId",
  as: "clients",
});

Client.belongsTo(User, {
  foreignKey: "userId",
  as: "owner",
});

// =========================
// Client ↔ Project
// =========================

Client.hasMany(Project, {
  foreignKey: "clientId",
  as: "projects",
});

Project.belongsTo(Client, {
  foreignKey: "clientId",
  as: "client",
});

// =========================
// Project ↔ Task
// =========================

Project.hasMany(Task, {
  foreignKey: "projectId",
  as: "tasks",
});

Task.belongsTo(Project, {
  foreignKey: "projectId",
  as: "project",
});

module.exports = {
  User,
  Client,
  Project,
  Task,
};