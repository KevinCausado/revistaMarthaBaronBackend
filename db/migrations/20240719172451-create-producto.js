<<<<<<< HEAD
"use strict";
=======
'use strict';

const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
console.log(process.env.NODE_ENV);
dotenv.config({ path: `${process.cwd()}/${envFile}` });
>>>>>>> 440c36a68335a12be547e7ec7dd20c5b082cba5b

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
<<<<<<< HEAD
    await queryInterface.createTable(
      {
        tableName: "productos",
        schema: process.env.DB_SCHEMA,
=======
    await queryInterface.createTable( {
      tableName: "productos",
      schema: process.env.DB_SCHEMA,
    }, {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
>>>>>>> 440c36a68335a12be547e7ec7dd20c5b082cba5b
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        descripcion: {
          type: Sequelize.STRING,
        },
        idCategoria: {
          type: Sequelize.INTEGER,
        },
        idProveedor: {
          type: Sequelize.INTEGER,
        },
        vlrUnitario: {
          type: Sequelize.DECIMAL,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          type: Sequelize.DATE,
        },
        deletedAt: {
          type: Sequelize.DATE,
        },
      }
    );
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("productos");
  },
};
