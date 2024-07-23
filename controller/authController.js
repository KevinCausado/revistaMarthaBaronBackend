const usuario = require("../db/models/usuario");

const signup = async (req, res, next) => {
  const body = req.body;

  const crearUsuario = usuario.create({
    usuario: body.usuario,
    contrasena: body.contrasena,
  });

  if (!crearUsuario) {
    return res.status(400).json({
      status: "Bad Request",
      message: "No se pudo crear el usuario",
    });
  }

  return res.status(201).json({
    status: "Created",
    message: "Usuario creado con exito",
    data: crearUsuario,
  });
};

module.exports = { signup };
