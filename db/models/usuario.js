"use strict";
const { Model, Sequelize } = require("sequelize");

const sequelize = require("../../config/database");

module.exports = sequelize.define("Usuario",{
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    primerNombre: {
      type: Sequelize.STRING,
    },
    segundoNombre: {
      type: Sequelize.STRING,
    },
    primerApellido: {
      type: Sequelize.STRING
    },
    segundoApellido: {
      type: Sequelize.STRING
    },
    telefono: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    estado: {
      type: Sequelize.ENUM("A", "I"),
      defaultValue: "A",
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    deletedAt: {       
      type: Sequelize.DATE
    },
  },
  {
    paranoid: true,
    modelName: "Usuario",
    tableName: "usuarios",
  }
);
