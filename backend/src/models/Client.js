const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Client = sequelize.define(
  "Client",
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

    email: {
      type: DataTypes.STRING(150),
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },

    phone: {
      type: DataTypes.STRING(30),
      allowNull: true,
    },

    company: {
      type: DataTypes.STRING(150),
      allowNull: true,
    },

    address: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },

    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },

    userId: {
      // REVIEW: Add an explicit association constraint/index strategy and decide
      // whether client email uniqueness is scoped per owner.
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: "clients",
    timestamps: true,
  }
);

module.exports = Client;