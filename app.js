//Constantes dev
require("dotenv").config({ path: `${process.cwd()}/.env` });

// Variables servidor
const express = require("express");
const { authRouter } = require("./route/authRoute");
const { catchAsync } = require("./utils/catchAsync");
const AppError = require("./utils/appError");
const app = express();

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
    throw new AppError("Ruta no encontrada en producción", 404);
  })
);

app.use((err, req, res, next) => {
  res.status(err.statusCode).json({
    status: err.status,
    message: err.message,
    stack: err.stack,
  });
});
