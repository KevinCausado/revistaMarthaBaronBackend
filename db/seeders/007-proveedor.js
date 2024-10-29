'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'proveedor', schema: process.env.DB_SCHEMA }, [
      {
        tipo_servicio: "VIRTUAL",
        codigo: "PROV_00001",
        nombre: "PROVEEDOR 1",
        direccion: "CALLE 30 NO.8-120",
        email: "PROVEEDOR1@GMAIL.COM",
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
