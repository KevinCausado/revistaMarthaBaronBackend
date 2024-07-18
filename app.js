const express = require("express");
const { authRouter } = require("./route/authRoute");

const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Escuchando servidor en puerto : ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    message: "OK",
  });
});

//Ruta para autenticacion
app.use("/api/v1/auth", authRouter);
