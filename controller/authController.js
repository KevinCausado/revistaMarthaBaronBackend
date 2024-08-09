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
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return next(new AppError(errors, 400));
    }
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
    return next(new AppError(errors, 400));
  }
};

const authentication = async (req, res, next) => {
  try {
    let tokenId = "";
    let freshUser = "";
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      tokenId = req.headers.authorization.split(" ")[1];
    }
    if (!tokenId) {
      return next(new AppError("Por favor, inicie sesión", 401));
    }

    const tokenDetail = jwt.verify(tokenId, process.env.JWT);

    freshUser = await usuarioModel.findByPk(tokenDetail.id);

    if (!freshUser) {
      return next(new AppError("El usuario no existe", 400));
    }

    req.usuario = freshUser;

    return next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Token invalido", 400));
    }
  }
};

module.exports = { signup, login, authentication };
