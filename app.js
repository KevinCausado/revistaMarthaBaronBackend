//Dependencias
require('dotenv').config({ path: `${process.cwd()}/.env` })
const connection = require('./config/connection');
const router = require('./provider/router');
const { BASE_URL } = require('./constants')
const globalErrorHandler = require('./utils/globalErrorHandler');
const AppError = require('./utils/AppError');
const express = require('express')
const app = express();

//Conexion base de datos
connection()


//Conexion a puerto
app.listen(process.env.PORT, () => {
  console.log(`Escuchando servidor en puerto: ${process.env.PORT}`)
})
console.log('Entorno de desarrollo:', process.env.NODE_ENV)
console.log('Conectado a la base de datos')

app.use(express.json())


//Ruta Base
app.use(`${BASE_URL}`, router)


app.use('*', (req, res, next) => {
  throw new AppError(`Ruta no encontrada en: ${req.originalUrl}`,404)
})


//Manejoador de Errores Global
app.use(globalErrorHandler)
























