'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'inventario', schema: process.env.DB_SCHEMA }, [
      {
        id_producto: 1,
        cantidad: 5,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'inventario', schema: process.env.DB_SCHEMA }, null, {});
  }
};
