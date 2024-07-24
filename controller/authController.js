const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Modelo usuarios
const usuarioModel = require("../db/models/usuario");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  const body = req.body;

  const crearUsuario = await usuarioModel.create({
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

const login = async (req, res, next) => {
  const { usuario, contrasena } = req.body;

  if (!usuario || !contrasena) {
    return res.status(400).json({
      status: "Bad Request",
      message: "Proporcione un usuario o contraseña",
    });
  }

  const result = await usuarioModel.findOne({ where: { usuario: usuario } });

  if (!result || !(await bcrypt.compare(contrasena, result.contrasena))) {
    return res.status(401).json({
      status: "Unauthorized",
      message: "Usuario o contraseña no valido",
    });
  }

  const token = generateToken({
    id: result.id,
  });

  return res.status(200).json({
    status: "Success",
    message: "Inicio de sesión exitoso",
    token: token,
  });
};

module.exports = { signup,login };
