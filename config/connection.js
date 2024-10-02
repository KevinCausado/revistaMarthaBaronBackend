const sequelize = require('./sequelize')

const connection = async (app) => {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    app.listen(process.env.PORT, () => {
      console.log(`Escuchando servidor en puerto: ${process.env.PORT}`)
    })
    console.log('Entorno de desarrollo:', process.env.NODE_ENV)
    console.log('Conectado a la base de datos')

  } catch (error) {
    console.log('Error al conectarse a la base de datos', error)
  }
}


module.exports = connection