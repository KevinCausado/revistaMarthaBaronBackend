"use strict";
const { Model, DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");

const sequelize = require("../../config/database");

module.exports = sequelize.define(
  "Usuario",
  {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    usuario: {
      allowNull: false,
      notEmpty: true,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Por Favor digite el parametro 'usuario' en el cuerpo de la solicitud ",
        },
        notEmpty: {
          msg: "El campo 'usuario' no puede estar vacio, verifique",
        },
      },
    },
    contrasena: {
      allowNull: false,
      notEmpty: true,
      type: DataTypes.STRING,
      validate: {
        notNull: {
          msg: "Por Favor digite el parametro 'contrasena' en el cuerpo de la solicitud ",
        },
        notEmpty: {
          msg: "El campo 'contrasena' no puede estar vacio, verifique",
        },
      },
      set(value) {
        if (value && value.trim() !== "") {
          const hashPassword = bcrypt.hashSync(value, 10);
          this.setDataValue("contrasena", hashPassword);
        } else {
          this.setDataValue("contrasena", value);
        }
      },
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
      type: DataTypes.DATE,
    },
  },
  {
    paranoid: true,
    tableName: "usuarios",
  }
);
