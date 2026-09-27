const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

// REVIEW: Password is selected by default on User queries. Make accidental
// serialization difficult with explicit scopes/field selection and document
// the account lifecycle rules for role changes and deactivation.
const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },

    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      unique: true,
      validate: {
        isEmail: true,
      },
    },

    password: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },

    role: {
      type: DataTypes.ENUM(
        "ADMIN",
        "MANAGER",
        "EMPLOYEE",
        "CLIENT"
      ),
      allowNull: false,
      defaultValue: "EMPLOYEE",
    },
  },
  {
    tableName: "users",
    timestamps: true,
  }
);

module.exports = User;