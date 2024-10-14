const { Sequelize } = require('sequelize')
const config = require('./config')
const initModels = require('../db/models/initModels')
const sequelize = new Sequelize(config[process.env.NODE_ENV])

// Sincronizando Modelos
const models = initModels(sequelize)
sequelize.sync()

module.exports = { sequelize, models }
