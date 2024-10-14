'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'estado', schema: process.env.DB_SCHEMA }, [
      {
        id_pais: 1,
        nombre:'Atlantico',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'estado', schema: process.env.DB_SCHEMA }, null, {});
  }
};
