"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "Proveedor",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    nombre: {
      allowNull: false,
      notEmpty: true,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Por Favor digite el parametro 'nombre' en el cuerpo de la solicitud ",
        },
        notEmpty: {
          msg: "El campo 'nombre' no puede estar vacio, verifique",
        },
      },
    },
    direccion: {
      allowNull: false,
      notEmpty: true,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Por Favor digite el parametro 'direccion' en el cuerpo de la solicitud ",
        },
        notEmpty: {
          msg: "El campo 'direccion' no puede estar vacio, verifique",
        },
      },
    },
    ciudad: {
      allowNull: false,
      notEmpty: true,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Por Favor digite el parametro 'ciudad' en el cuerpo de la solicitud ",
        },
        notEmpty: {
          msg: "El campo 'ciudad' no puede estar vacio, verifique",
        },
      },
    },
    estado: {
      alowNull: false,
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
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    tableName: "proveedores",
  }
);
