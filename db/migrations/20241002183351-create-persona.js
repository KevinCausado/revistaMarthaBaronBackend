'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable({ tableName: 'persona', schema: process.env.DB_SCHEMA }, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      primer_nombre: {
        type: DataTypes.STRING
      },
      segundo_nombre: {
        type: DataTypes.STRING
      },
      primer_apellido: {
        type: DataTypes.STRING
      },
      email: {
        type: DataTypes.STRING
      },
      telefono: {
        type: DataTypes.STRING
      },
      direccion: {
        type: DataTypes.STRING
      },
      rol: {
        type: DataTypes.STRING
      },
      id_ciudad_municipio: {
        type: DataTypes.INTEGER
      },
      id_ciudad_departamento: {
        type: DataTypes.INTEGER
      },
      id_pais: {
        type: DataTypes.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('persona');
  }
};