const express = require("express");
const app = express();
const PORT = 4000;

app.listen(PORT, () => {
  console.log(`Escuchando servidor en puerto: ${PORT}`);
});

app.get("/", (req, res) => {
  res.status(200).json({
    status: 200,
    message: "Mostrando mensaje por API",
  });
});
