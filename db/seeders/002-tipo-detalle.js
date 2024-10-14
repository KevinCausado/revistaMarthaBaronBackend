'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'tipo_detalle', schema: process.env.DB_SCHEMA }, [
      {
        codigo: 'ENT',
        descripcion: 'Entrada',
        id_tipo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        codigo: 'SAL',
        descripcion: 'Salida',
        id_tipo: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        codigo: 'CC',
        descripcion: 'Cédula de ciudadania',
        id_tipo: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'tipo_detalle', schema: process.env.DB_SCHEMA }, null, {});
  }
};
