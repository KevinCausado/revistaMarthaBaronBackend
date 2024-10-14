'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'tipo', schema: process.env.DB_SCHEMA }, [
      {
        nombre: 'Movimiento',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Documento',
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'tipo', schema: process.env.DB_SCHEMA }, null, {});
  }
};
