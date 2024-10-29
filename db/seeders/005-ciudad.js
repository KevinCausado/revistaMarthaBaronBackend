'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'ciudad', schema: process.env.DB_SCHEMA }, [
      {
        id_estado: 1,
        nombre:'BARRANQUILLA',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_estado: 1,
        nombre:'SOLEDAD',
        createdAt: new Date(),
        updatedAt: new Date()
      },
     
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'ciudad', schema: process.env.DB_SCHEMA }, null, {});
  }
};
