const usuario = require("../db/models/usuario");
const jwt = require("jsonwebtoken");

const generateToken = (id) => {
  return jwt.sign(id, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  const body = req.body;

  const crearUsuario = await usuario.create({
    usuario: body.usuario,
    contrasena: body.contrasena,
  });

  const result = crearUsuario.toJSON();
  delete result.contrasena;
  delete result.deletedAt;

  result.token = generateToken({
    id: result.id,
  });

  if (!result) {
    return res.status(400).json({
      status: "Bad Request",
      message: "No se pudo crear el usuario",
    });
  }

  return res.status(201).json({
    status: "Created",
    message: "Usuario creado con exito",
    data: result,
  });
};

module.exports = { signup };
