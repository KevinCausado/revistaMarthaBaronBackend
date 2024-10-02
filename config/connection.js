const initModels = require('../db/models/initModels')
const sequelize = require('./sequelize')

const connection = async () => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })

  } catch (error) {
    console.log('Error al conectarse a la base de datos', error)
  }
}


module.exports = connection