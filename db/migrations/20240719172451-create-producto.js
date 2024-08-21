"use strict";

const { DataTypes } = require('sequelize');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: "productos",
        schema: process.env.DB_SCHEMA,
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: DataTypes.INTEGER,
        },
        descripcion: {
          allowNull: false,
          type: DataTypes.STRING,
        },
        idCategoria: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references:{
            model:'categorias', // tabla
            key:'id'
           }
        },
        idProveedor: {
          allowNull: false,
          type: DataTypes.INTEGER,
          references:{
            model:'proveedores', // tabla
            key:'id'
           }
        },
        vlrUnitario: {
          allowNull: false,
          type: DataTypes.DECIMAL,
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
    await queryInterface.dropTable("productos");
  },
};
