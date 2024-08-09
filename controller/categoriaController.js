const categoriaModel = require("../db/models/categoria");
const AppError = require("../utils/appError");

const createCategoria = async (req, res, next) => {
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

module.exports = { createCategoria };
