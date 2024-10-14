'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'movimiento_detalle', schema: process.env.DB_SCHEMA }, [
      {
        id_movimiento: 1,
        id_producto: 1,
        cantidad:10,
        precio_entrada_unitario: 10000,
        porcentaje_ganancia: 0,
        precio_salida_unitario: 0,
        total: 100000,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        id_movimiento: 2,
        id_producto: 1,
        cantidad:5,
        precio_entrada_unitario: 10000,
        porcentaje_ganancia: 50,
        precio_salida_unitario: 15000,
        total: 75000,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'movimiento_detalle', schema: process.env.DB_SCHEMA }, null, {});
  }
};
