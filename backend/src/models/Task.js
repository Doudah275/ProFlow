const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Task = sequelize.define(
  "Task",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    title: {
      type: DataTypes.STRING(200),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "TODO",
        "IN_PROGRESS",
        "COMPLETED"
      ),
      allowNull: false,
      defaultValue: "TODO",
    },

    priority: {
      type: DataTypes.ENUM(
        "LOW",
        "MEDIUM",
        "HIGH"
      ),
      allowNull: false,
      defaultValue: "MEDIUM",
    },

    dueDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    projectId: {
      // REVIEW: Confirm foreign-key enforcement and cascade/restrict behavior;
      // task lifecycle depends on project deletion semantics.
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "tasks",
    timestamps: true,
  }
);

module.exports = Task;