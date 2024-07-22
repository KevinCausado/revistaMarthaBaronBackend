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
    await queryInterface.sequelize.query("create TYPE estado_enum as ENUM('A','I')");

<<<<<<< HEAD
    await queryInterface.createTable(
      {
        tableName: "proveedores",
        schema: process.env.DB_SCHEMA,
=======
   await queryInterface.sequelize.query("create TYPE estado_enum as ENUM('A','I')"); 

    await queryInterface.createTable( {
      tableName: "proveedores",
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
        nombre: {
          type: Sequelize.STRING,
        },
        direccion: {
          type: Sequelize.STRING,
        },
        ciudad: {
          type: Sequelize.STRING,
        },
        estado: {
          alowNull: false,
          type: "estado_enum",
          defaultValue: "A",
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
    await queryInterface.dropTable("proveedores");
  },
};
