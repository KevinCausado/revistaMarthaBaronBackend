'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable({
      tableName:'personas',
      schema:process.env.DB_SCHEMA
    }, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      primerNombre: {
        allowNull: false,
        type: DataTypes.STRING
      },
      segundoNombre: {
        type: DataTypes.STRING
      },
      primerApellido: {
        allowNull: false,
        type: DataTypes.STRING
      },
      segundoApellido: {
        allowNull: false,
        type: DataTypes.STRING
      },
      telefono: {
        allowNull: false,
        type: DataTypes.STRING
      },
      email: {
        allowNull: false,
        type: DataTypes.STRING
      },
      estado: {
        allowNull: false,
        type: DataTypes.ENUM('A','I'),
        defaultValue:'A'
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('personas');
  }
};