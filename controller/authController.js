const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

//Modelo usuarios
const usuarioModel = require("../db/models/usuario");
const AppError = require("../utils/appError");

const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });
};

const signup = async (req, res, next) => {
  try {
    const { usuario, contrasena, confirmarContrasena } = req.body;

    if (contrasena !== confirmarContrasena) {
      return next(new AppError("Las contraseñas no coinciden", 400));
    }

    const createUser = await usuarioModel.create({
      usuario: usuario,
      contrasena: contrasena,
      confirmarContrasena: confirmarContrasena,
    });

    if (!createUser) {
      return next(new AppError("No se puedo crear el usuario", 400));
    }

    const result = createUser.toJSON();
    delete result.contrasena;
    delete result.deletedAt;

    result.token = generateToken({
      id: result.id,
    });

    return res.status(201).json({
      status: "Created",
      message: "Usuario creado con exito",
      data: result,
    });
  } catch (error) {
    const errors = error.errors.map((err) => err.message);

    return res.status(400).json({
      status: "Fail",
      message: errors,
    });
  }
};

const login = async (req, res, next) => {
  try {
    const { usuario, contrasena } = req.body;

    if (!usuario || !contrasena) {
      return next(new AppError("Proporcione un 'usuario' o 'contraseña' ", 400));
    }

    const result = await usuarioModel.findOne({ where: { usuario: usuario } });

    if (!result || !(await bcrypt.compare(contrasena, result.contrasena))) {
      return next(new AppError("Usuario o contraseña no valido", 400));
    }

    const token = generateToken({
      id: result.id,
    });

    return res.status(200).json({
      status: "Success",
      message: "Inicio de sesión exitoso",
      token: token,
    });
  } catch (error) {
    const errors = error.errors.map((err) => err.message);

    return res.status(500).json({
      status: "Server Error",
      message: errors,
    });
  }
};

module.exports = { signup, login };
