'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'persona', schema: process.env.DB_SCHEMA }, [
      {
        tipo_documento: 3,
        documento: "1143139751",
        primer_nombre: "KEVIN",
        segundo_nombre: "JOSE",
        primer_apellido: "CAUSADO",
        segundo_apellido: "BARON",
        email: "KEVINCAUSADO@GMAIL.COM",
        telefono: "3152089391",
        direccion: "CRA 41G NO.113-125, TORRE 22 APTO 504, CONJUNTO GORRION, ALAMEDA DEL RIO",        
        id_ciudad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo_documento: 3,
        documento: "50852160",
        primer_nombre: "MARTHA",
        segundo_nombre: "CECILIA",
        primer_apellido: "BARON",
        segundo_apellido: "LENES",
        email: "MARTHABARON@GMAIL.COM",
        telefono: "3126289677",
        direccion: "CRA 41G NO.113-125, TORRE 22 APTO 504, CONJUNTO GORRION, ALAMEDA DEL RIO",        
        id_ciudad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
     
    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'persona', schema: process.env.DB_SCHEMA }, null, {});
  }
};
