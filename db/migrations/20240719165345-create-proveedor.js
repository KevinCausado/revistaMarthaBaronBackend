'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {

   await queryInterface.sequelize.query("create TYPE estado_enum as ENUM('A','I')"); 

    await queryInterface.createTable('Proveedores', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nombre: {
        type: Sequelize.STRING
      },
      direccion: {
        type: Sequelize.STRING
      },
      ciudad: {
        type: Sequelize.STRING
      }, 
      estado:{
        alowNull:false,
        type:'estado_enum',
        defaultValue:'A'
      },     
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },     
      updatedAt: {        
        type: Sequelize.DATE
      },
      deletedAt: {       
        type: Sequelize.DATE
      },

    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Proveedores');
  }
};