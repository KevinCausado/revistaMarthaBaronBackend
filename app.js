//Constantes dev
require("dotenv").config({ path: `${process.cwd()}/.env` });

// Variables servidor
const express = require("express");
const { authRouter } = require("./route/authRoute");
const { catchAsync } = require("./utils/catchAsync");
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
  catchAsync((req, res, next) => {
    throw new Error("Ruta no encontrada");
  })
);

app.use((err, req, res, next) => {
  res.status(404).json({
    status: "Not found",
    message: err.message,
  });
});


