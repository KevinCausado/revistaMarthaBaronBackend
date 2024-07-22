"use strict";

<<<<<<< HEAD
=======
const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
console.log(process.env.NODE_ENV);
dotenv.config({ path: `${process.cwd()}/${envFile}` });

>>>>>>> 440c36a68335a12be547e7ec7dd20c5b082cba5b
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable(
      {
        tableName: "categorias",
        schema: process.env.DB_SCHEMA,
      },
      {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        nombre: {
          type: Sequelize.STRING,
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
<<<<<<< HEAD
    await queryInterface.dropTable("categorias");
=======
    await queryInterface.dropTable("Categoria");
>>>>>>> 440c36a68335a12be547e7ec7dd20c5b082cba5b
  },
};
