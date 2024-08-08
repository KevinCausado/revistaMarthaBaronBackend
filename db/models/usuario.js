"use strict";
const { Model, DataTypes } = require("sequelize");

const bcrypt = require("bcrypt");

const sequelize = require("../../config/database");
const AppError = require("../../utils/appError");

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
        emptyField(value) {
          if (value === "") {
            throw new AppError("El campo 'contrasena' no puede estar vacio, verifique", 400);
          }
        },
      },
    },
    confirmarContrasena: {
      allowNull: false,
      notEmpty: true,
      type: DataTypes.VIRTUAL,
      validate: {
        notNull: {
          msg: "Por Favor digite el parametro 'confirmarContrasena' en el cuerpo de la solicitud ",
        },
        emptyDontMatch(value) {
          if (value === "") {
            throw new AppError("El campo 'confirmarContrasena' no puede estar vacio, verifique", 400);
          }
          if (value !== this.contrasena) {
            throw new AppError("Las contraseñas no coinciden", 400);
          }
        },
        set(value) {
          if (value === this.contrasena) {
            const hashPassword = bcrypt.hashSync(value, 10);
            this.setDataValue("contrasena", hashPassword);
          }
        },
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
