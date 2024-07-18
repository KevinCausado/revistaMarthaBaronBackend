//Constantes dev
const dotenv = require("dotenv");
const envFile = process.env.NODE_ENV === "production" ? ".env.production" : ".env.development";
console.log(process.env.NODE_ENV);
dotenv.config({ path: `${process.cwd()}/${envFile}` });

const PORT = process.env.PORT;

// Variables servidor
const express = require("express");
const { authRouter } = require("./route/authRoute");
const app = express();

//Mensaje de prueba consola
app.listen(PORT, () => {
  console.log(`Escuchando servidor en puerto : ${PORT}`);
});

//Ruta para autenticacion
app.use("/api/v1/auth", authRouter);
