//Constantes dev
require("dotenv").config({ path: `${process.cwd()}/.env`});

// Variables servidor
const express = require("express");
const { authRouter } = require("./route/authRoute");
const app = express();

//Mensaje de prueba consola
app.listen(process.env.PORT, () => {
  console.log(`Escuchando servidor en puerto : ${process.env.PORT}`);
});

//Ruta para autenticacion
app.use("/api/v1/auth", authRouter);

//Ruta no valida
app.use("*", (req, res) => {
  res.status(404).json({
    status: "404",
    message: "Ruta no encontrada",
  });
});
