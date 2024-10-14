'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'movimiento', schema: process.env.DB_SCHEMA }, [
      {
        tipo_movimiento: 1,
        descripcion: "Movimiento 1(Entrada)",
        fecha: new Date(),
        id_proveedor: 1,
        id_persona: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo_movimiento: 2,
        descripcion: "Movimiento 2(Salida)",
        fecha: new Date(),
        id_proveedor: 1,
        id_persona: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'movimiento', schema: process.env.DB_SCHEMA }, null, {});
  }
};
