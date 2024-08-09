const categoriaModel = require("../db/models/categoria");

const createCategoria = async (req, res, next) => {
  try {
    const { nombre } = req.body;

    const createField = await categoriaModel.create({
      nombre: nombre,
    });

    if (!createField) {
      return next(new AppError("No se pudo crear la categoria"));
    }
    const data = createField.toJSON();

    delete data.deletedAt;

    return res.status(201).json({
      status: "Success",
      message: "Categoria creada con exito",
      data: data,
    });
  } catch (error) {
    const errors = error.errors.map((err) => err.message);
    return res.status(401).json({
      status: "Fail",
      message: errors,
    });
  }
};

module.exports = { createCategoria };
