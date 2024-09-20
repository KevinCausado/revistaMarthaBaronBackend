//Constantes dev
require("dotenv").config({ path: `${process.cwd()}/.env` });

// Variables servidor
const express = require("express");
const cors = require('cors')
const { authRoute } = require("./route/authRoute");
const AppError = require("./utils/appError");
const globalErrorHandler = require("./controller/errorController");
const { categoriaRoute } = require("./route/categoriaRoute");
const { connection } = require("./config/connection");
const { proveedorRoute } = require("./route/proveedorRoute");
const app = express();

console.log(`Entorno: ${process.env.NODE_ENV}`);

//Escuchando servidor
app.listen(process.env.PORT, () => {
  console.log(`Escuchando servidor en puerto : ${process.env.PORT}`);
});

connection(); // Conexión base de datos

app.use(express.json()); // Middleware JSON

app.use(cors({
  origin: 'http://localhost:5173',
  headers: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}))//cors

//Ruta para autenticacion
app.use("/api/v1/auth", authRoute);
app.use("/api/v1/categoria", categoriaRoute);
app.use("/api/v1/proveedor", proveedorRoute);

//Rutas no validas
app.use("*", async (req, res, next) => {
  return next(new AppError(`Ruta ${req.originalUrl} no encontrada en ${process.env.NODE_ENV}`, 404));
});

app.use(globalErrorHandler);
