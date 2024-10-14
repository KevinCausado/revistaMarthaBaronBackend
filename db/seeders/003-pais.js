'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'pais', schema: process.env.DB_SCHEMA }, [
      {
        codigo: 'COL',
        nombre: 'Colombia',
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        codigo: 'USA',
        nombre: 'Estados Unidos',
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'pais', schema: process.env.DB_SCHEMA }, null, {});
  }
};
