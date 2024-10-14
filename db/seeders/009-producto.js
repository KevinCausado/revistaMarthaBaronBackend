'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'producto', schema: process.env.DB_SCHEMA }, [
      {
        codigo: "PROD_00001",
        nombre: "Producto 1",
        descripcion: "Producto para el cuidado de la piel",
        id_categoria: 1,
        id_proveedor: 1,
        precio_entrada: 10000,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'producto', schema: process.env.DB_SCHEMA }, null, {});
  }
};
