const proveedorModel = require("../db/models/proveedor");
const AppError = require("../utils/appError");

const createRecord = async (req, res, next) => {
  try {
    const { nombre, direccion, ciudad } = req.body;

    const findRecord = await proveedorModel.findOne({ where: { nombre: nombre } })

    if (findRecord) {
      return next(new AppError('El registro ya existe', 409))
    }

    const createField = await proveedorModel.create({
      nombre: nombre,
      direccion: direccion,
      ciudad: ciudad,
    });

    if (!createField) {
      return next(new AppError("No se pudo crear el registro", 400));
    }
    const data = createField.toJSON();

    delete data.deletedAt;

    return res.status(201).json({
      status: "Success",
      message: "Registro creado con exito",
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

const getAllRecord = async (req, res, next) => {
  try {
    const getRecords = await proveedorModel.findAll();

    const list = getRecords.map((item) => item.toJSON());

    list.forEach((item) => delete item.deletedAt);

    return res.status(200).json({
      status: "OK",
      data: list,
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

const getRecordById = async (req, res, next) => {
  try {
    const id = req.params.id;
    const findById = await proveedorModel.findByPk(id);

    if (!findById) {
      return next(new AppError("Registro no encontrado", 404));
    }

    const result = findById.toJSON();

    delete result.deletedAt;

    return res.status(200).json({
      status: "Success",
      data: result,
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

const updateRecord = async (req, res, next) => {
  try {
    const id = req.params.id;
    const body = req.body;

    const result = await proveedorModel.findByPk(id);

    if (!result) {
      return next(new AppError("Registro no encontrado", 404));
    }

    result.nombre = body.nombre;
    result.direccion = body.direccion;
    result.ciudad = body.ciudad;

    await result.save();

    return res.status(200).json({
      status: "Success",
      message: "Registro actualizado",
      data: result,
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

const deleteRecord = async (req, res, next) => {
  try {
    const id = req.params.id;

    const result = await proveedorModel.findByPk(id);

    if (!result) {
      return next(new AppError("Registro no encontrado", 404));
    }

    await result.destroy();

    return res.status(200).json({
      status: "Success",
      message: "Registro eliminado",
    });
  } catch (error) {
    return next(new AppError(error, 400));
  }
};

module.exports = { createRecord, getAllRecord, getRecordById, updateRecord, deleteRecord };
