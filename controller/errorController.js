const sendErrorDev = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'Error en desarrollo';
  const message = err.message;
  const stack = err.stack;

  return res.status(statusCode).json({
    status: status,
    message: message,
    stack: stack,
  });
};

const sendErrorProd = (err, res) => {
  const statusCode = err.statusCode || 500;
  const status = err.status || 'Error en produccion';;
  const message = err.message;

  if (err.isOperational) {
    return res.status(statusCode).json({
      status: status,
      message: message,
    });
  }

  return res.status(500).json({
    status: "Server Error",
    message: "Algo fue mal",
  });
};

const globalErrorHandler = (err, req, res, next) => {
  if (process.env.NODE_ENV === "development") {
    return sendErrorDev(err, res);
  }

  return sendErrorProd(err, res);
};

module.exports = globalErrorHandler ;
