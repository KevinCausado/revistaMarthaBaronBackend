const categoriaModel = require("../db/models/categoria");
const AppError = require("../utils/appError");

const create = async (req, res, next) => {
  try {
    const { nombre } = req.body;

    const createField = await categoriaModel.create({
      nombre: nombre,
    });

    if (!createField) {
      return next(new AppError("No se pudo crear la categoria", 400));
    }
    const data = createField.toJSON();

    delete data.deletedAt;

    return res.status(201).json({
      status: "Success",
      message: "Categoria creada con exito",
      data: data,
    });
  } catch (error) {
    if (error.name === "SequelizeValidationError") {
      const errors = error.errors.map((err) => err.message);
      return next(new AppError(errors, 400));
    }
    if (error.name === "SequelizeForeignKeyConstraintError") {
      const errors = error.errors.map((err) => err.message);
      return next(new AppError(errors, 400));
    }
  }
};

const getAll = async (req, res, next) => {
  try {
    let list = [];

    const result = await categoriaModel.findAll();

    result.forEach((data) => {
      list.push(data.toJSON());
    });

    list.forEach((data) => {
      return delete data.deletedAt;
    });

    return res.status(200).json({
      status: "OK",
      data: list,
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

module.exports = { create, getAll };
