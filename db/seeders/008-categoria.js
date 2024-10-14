'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'categoria', schema: process.env.DB_SCHEMA }, [
      {
        codigo: "CAT_00001",        
        descripcion: "Perfume para mujer",        
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'categoria', schema: process.env.DB_SCHEMA }, null, {});
  }
};
