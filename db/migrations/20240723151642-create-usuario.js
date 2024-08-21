"use strict";

const { DataTypes } = require("sequelize");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: "usuarios",
        schema: process.env.DB_SCHEMA,
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        usuario: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        contrasena: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        estado: {
          allowNull: false,
          type: DataTypes.ENUM("A", "I"),
          defaultValue: "A",
        },
        rol: {
          allowNull: false,
          type: DataTypes.ENUM("admin", "cliente"),
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("usuarios");
  },
};
