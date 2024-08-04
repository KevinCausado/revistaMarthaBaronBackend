"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");

const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "Persona",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    primerNombre: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    segundoNombre: {
      type: DataTypes.STRING,
    },
    primerApellido: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    segundoApellido: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    telefono: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    email: {
      allowNull: false,
      type: DataTypes.STRING,
    },
    estado: {
      allowNull: false,
      type: DataTypes.ENUM("A", "I"),
      defaultValue: "A",
    },
    createdAt: {
      allowNull: false,
      type: DataTypes.DATE,
    },
    updatedAt: {
      type: DataTypes.DATE,
    },
    deletedAt: {
      type: Sequelize.DATE,
    },
  },
  {
    paranoid: true,
    tableName: "personas",
  }
);
