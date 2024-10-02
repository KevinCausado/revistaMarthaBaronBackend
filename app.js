//Dependencias
require('dotenv').config({ path: `${process.cwd()}/.env` })
const express = require('express')
const app = express();
const connection = require('./config/connection');
const router = require('./provider/router');
const { BASE_URL } = require('./constants')
const globalErrorHandler = require('./utils/globalErrorHandler');
const AppError = require('./utils/appError');

//Conexion base de datos y puerto
connection(app)


//Rutas Base
app.use(`${BASE_URL}/auth`, router)
app.use(`${BASE_URL}/categoria`, router)


app.use('*', (req, res, next) => {
  throw new AppError(`Ruta no encontrada en: ${req.originalUrl}`,404)
})


//Manejoador de Errores Global
app.use(globalErrorHandler)
























