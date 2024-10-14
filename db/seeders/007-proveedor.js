'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'proveedor', schema: process.env.DB_SCHEMA }, [
      {
        tipo_servicio: "VIRTUAL",
        codigo: "PROV_00001",
        nombre: "Proveedor 1",
        direccion: "Calle 30 No.8-120",
        email: "proveedor1@gmail.com",
        telefono: "312546987",
        id_ciudad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'proveedor', schema: process.env.DB_SCHEMA }, null, {});
  }
};
