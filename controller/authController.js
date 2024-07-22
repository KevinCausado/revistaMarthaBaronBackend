const usuario = require("../db/models/usuario");

const signup = (req, res, next) => {
  const body = req.body;

  const createUser = usuario.create({
    primerNombre: body.primerNombre,
    segundoNombre: body.segundoNombre,
    primerApellido: body.primerApellido,
    segundoApellido: body.segundoApellido,
    telefono: body.telefono,
    email: body.email,
    estado: body.estado,
  });

  if (!createUser) {
    return res.status(400).json({
      status: "Fail",
      message: "Error al crear al usuario",
    });
  }

  return res.status(201).json({
    status: "OK",
    message: "Usuario creado con exito",
  });
};

module.exports = { signup };
