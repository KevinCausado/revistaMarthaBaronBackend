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
    const { usuario, contrasena, confirmarContrasena, rol } = req.body;

    const findUser = await usuarioModel.findOne({ where: { usuario: usuario } })

    if (findUser) {
      return next(new AppError('El usuario ya existe', 409))
    }

    const createUser = await usuarioModel.create({
      usuario: usuario,
      contrasena: contrasena,
      confirmarContrasena: confirmarContrasena,
      rol: rol,
    });

    const result = createUser.toJSON();
    delete result.contrasena;
    delete result.confirmarContrasena;
    delete result.createdAt
    delete result.updatedAt
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
      rol: result.rol,
      token: token,
    });
  } catch (error) {
    const errors = error.errors.map((err) => err.message);
    return next(new AppError(errors, 400));
  }
};

const authentication = async (req, res, next) => {
  try {
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
      var token = req.headers.authorization.split(" ")[1];
    }

    if (!token) {
      return next(new AppError("Por favor, inicie sesion", 401));
    }

    const tokenDetail = await jwt.verify(token, process.env.JWT);
    const result = await usuarioModel.findByPk(tokenDetail.id);

    if (!result) {
      return next(new AppError("Usuario no encontrado", 404));
    }

    req.usuario = result;
    next();
  } catch (error) {
    if (error.name === "JsonWebTokenError") {
      return next(new AppError("Token invalido", 401));
    }
  }
};

const restrictTo = (...UserType) => {
  return (req, res, next) => {
    if (!UserType.includes(req.usuario.rol)) {
      return next(new AppError("No tiene permitido realizar esta accion", 403));
    }
    next();
  };
};

module.exports = { signup, login, authentication, restrictTo };
