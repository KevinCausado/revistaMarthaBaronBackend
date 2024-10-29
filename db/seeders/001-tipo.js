'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'tipo', schema: process.env.DB_SCHEMA }, [
      {
        nombre: 'MOVIMIENTO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'DOCUMENTO',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'tipo', schema: process.env.DB_SCHEMA }, null, {});
  }
};
