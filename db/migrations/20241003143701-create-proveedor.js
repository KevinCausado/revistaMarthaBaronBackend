'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Proveedors', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      codigo: {
        type: DataTypes.STRING
      },
      tipo_servicio: {
        type: DataTypes.STRING
      },
      nombre: {
        type: DataTypes.STRING
      },
      direccion: {
        type: DataTypes.TEXT
      },
      email: {
        type: DataTypes.STRING
      },
      telefono: {
        type: DataTypes.STRING
      },
      id_ciudad: {
        type: DataTypes.INTEGER
      },
      id_estado: {
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
      },
      deletedAt: {        
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Proveedors');
  }
};