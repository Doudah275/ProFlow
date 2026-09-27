const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Project = sequelize.define(
  "Project",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(150),
      allowNull: false,
    },

    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    status: {
      type: DataTypes.ENUM(
        "PLANNING",
        "IN_PROGRESS",
        "COMPLETED",
        "CANCELLED"
      ),
      allowNull: false,
      defaultValue: "PLANNING",
    },

    startDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    endDate: {
      type: DataTypes.DATEONLY,
      allowNull: true,
    },

    clientId: {
      // REVIEW: Confirm foreign-key enforcement and delete semantics for a
      // client with projects; current service behavior is not transactional.
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "projects",
    timestamps: true,
  }
);

module.exports = Project;