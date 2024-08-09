const sequelize = require("./database");

const connection = async () => {
  try {
    await sequelize.authenticate();
    console.log("Conexión establecida con la base de datos");
  } catch (error) {
    console.log("Error al conectarse a la base de datos", error);
  }
};

module.exports = {connection};
