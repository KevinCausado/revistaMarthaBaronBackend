'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'rol', schema: process.env.DB_SCHEMA }, [
      {
        nombre: "ADMINISTRADOR",
        isSuperAdmin: true,
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'rol', schema: process.env.DB_SCHEMA }, null, {});
  }
};
