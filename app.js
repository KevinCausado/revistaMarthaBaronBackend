//Constantes dev
require("dotenv").config({ path: `${process.cwd()}/.env` });

// Variables servidor
const express = require("express");
const { authRouter } = require("./route/authRoute");
const { catchAsync } = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const app = express();

console.log(`Entorno: ${process.env.NODE_ENV}`);

//Mensaje de prueba consola
app.listen(process.env.PORT, () => {
  console.log(`Escuchando servidor en puerto : ${process.env.PORT}`);
});

app.use(express.json()); //

//Ruta para autenticacion
app.use("/api/v1/auth", authRouter);

//Ruta no valida
app.use(
  "*",
  catchAsync(async (req, res, next) => {
    throw new AppError(`Ruta ${req.originalUrl} no encontrada en ${process.env.NODE_ENV}`, 404);
  })
);

app.use(globalErrorHandler);
