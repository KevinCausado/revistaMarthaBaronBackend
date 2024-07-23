"use strict";

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    // await queryInterface.sequelize.query("create TYPE estado_enum as ENUM('A','I')");

    await queryInterface.createTable(
      {
        tableName: "proveedores",
        schema: process.env.DB_SCHEMA,
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        nombre: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        direccion: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        ciudad: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        estado: {
          alowNull: false,
          type: DataTypes.ENUM('A','I'),
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
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("proveedores");
  },
};
