'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'persona', schema: process.env.DB_SCHEMA }, [
      {
        tipo_documento: 3,
        documento: "1143139751",
        primer_nombre: "Kevin",
        segundo_nombre: "José",
        primer_apellido: "Causado",
        segundo_apellido: "Barón",
        email: "kevincausado@gmail.com",
        telefono: "3152089391",
        direccion: "Cra 41G No.113-125, Torre 22 Apto 504, Conjunto Gorrion, Alameda del Rio",        
        id_ciudad: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        tipo_documento: 3,
        documento: "50852160",
        primer_nombre: "Martha",
        segundo_nombre: "Cecilia",
        primer_apellido: "Barón",
        segundo_apellido: "Lenes",
        email: "marthabaron@gmail.com",
        telefono: "3126289677",
        direccion: "Cra 41G No.113-125, Torre 22 Apto 504, Conjunto Gorrion, Alameda del Rio",        
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
