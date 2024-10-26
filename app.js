//Dependencias
require('dotenv').config({ path: `${process.cwd()}/.env` })
const connection = require('./config/connection');
const router = require('./provider/router');
const { BASE_URL } = require('./constants')
const globalErrorHandler = require('./utils/globalErrorHandler');
const AppError = require('./utils/AppError');
const express = require('express')
const app = express();
const cors = require('cors')

//Conexion base de datos
connection()


//Conexion a puerto
app.listen(process.env.PORT, () => {
  console.log(`Listen server on PORT: ${process.env.PORT}`)
})
console.log('ENVIROMENT:', process.env.NODE_ENV)
console.log('Connected to the database')

app.use(express.json())

//Cors
corsOptions = {
  origin:['http://localhost:5173','http://localhost:3000'],
  headers:['GET','POST','PUT','DELETE'],
  allowedHeaders:['Content-Type','Authorization']
}

app.use (cors(corsOptions))


//Ruta Base
app.use(`${BASE_URL}`, router)


app.use('*', async(req, res, next) => {
  return next (new AppError(`Path not found in: ${req.originalUrl}`,404))
})


//Manejador de Errores Global
app.use(globalErrorHandler)
























