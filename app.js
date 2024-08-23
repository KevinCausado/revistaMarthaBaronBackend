//Constantes dev
require("dotenv").config({ path: `${process.cwd()}/.env` });

// Variables servidor
const express = require("express");
const { authRoute } = require("./route/authRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const { categoriaRoute } = require("./route/categoriaRoute");
const { connection } = require("./config/connection");
const app = express();

console.log(`Entorno: ${process.env.NODE_ENV}`);

//Escuchando servidor
app.listen(process.env.PORT, () => {
  console.log(`Escuchando servidor en puerto : ${process.env.PORT}`);
});

connection();

app.use(express.json()); // Middleware JSON

//Ruta para autenticacion
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categoria", categoriaRoute);

//Rutas no validas
app.use("*", async (req, res, next) => {
  return next(new AppError(`Ruta ${req.originalUrl} no encontrada en ${process.env.NODE_ENV}`, 404));
});

app.use(globalErrorHandler);
