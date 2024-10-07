'use strict';

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('MovimientoDetalle', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      id_movimiento: {
        type: DataTypes.INTEGER
      },
      id_producto: {
        type: DataTypes.INTEGER
      },
      cantidad: {
        type: DataTypes.INTEGER
      },
      precio_entrada_unitario: {
        type: DataTypes.DOUBLE
      },
      porcentaje_ganancia: {
        type: DataTypes.INTEGER
      },
      precio_salida_unitario: {
        type: Sequelize.DOUBLE
      },
      total: {
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
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('MovimientoDetalle');
  }
};