'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert({ tableName: 'usuario', schema: process.env.DB_SCHEMA }, [
      {
        usuario: "ragnargladiatore@gmail.com",
        contrasena:"$2b$10$aIL3nsARwqmj00o8qV9GzOV52GHRmk5hYI7B6CwkO5A.XDy8wXTRa",
        id_persona:1,
        createdAt: new Date(),
        updatedAt: new Date()
      },

    ], {});
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete({ tableName: 'usuario', schema: process.env.DB_SCHEMA }, null, {});
  }
};
