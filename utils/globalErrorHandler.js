require('dotenv').config({ path: `${process.cwd()}/.env` })

const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500
  const status = err.status || 'Error en development'
  const message = err.message 
  const stack = err.stack

  if (err.isOperational) {
    return res.status(statusCode).json({
      Estado: status,
      Mensaje: message,
      // stack: stack
    })
  }

  return res.status(statusCode).json({
    Estado: status,
    Mensaje: message
  })
}


const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500
  const status = err.status || 'Error en production'
  const message = err.message

  return res.status(statusCode).json({
    Estado: status,
    Mensaje: message
  })
}

const globalErrorHandler = (err,req,res,next) => {
  if (process.env.NODE_ENV === 'development') {
    return sendErrorDev(err, res)
  }
  return sendErrorProd(err, res)
}

module.exports = globalErrorHandler
