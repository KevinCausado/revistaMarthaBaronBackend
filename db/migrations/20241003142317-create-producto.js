'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Productos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      codigo: {
        type: DataTypes.STRING
      },
      nombre: {
        type: DataTypes.STRING
      },
      descripcion: {
        type: DataTypes.TEXT
      },
      id_categoria: {
        type: DataTypes.INTEGER,
        References:{
          model:'Categoria',
          key:'id'
        }
      },
      id_proveedor: {
        type: DataTypes.INTEGER,
        References:{
          model:'Proveedor',
          key:'id'
        }
      },
      precio_entrada: {
        type: DataTypes.DOUBLE
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
    await queryInterface.dropTable('Productos');
  }
};