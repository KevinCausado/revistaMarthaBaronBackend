const AppError = require('../../utils/AppError')
const { sequelize, models } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')
class ProductoController {

  static async create(req, res, next) {
    try {
      let response = await models.Producto.findOne({ where: { codigo: req.body.codigo.toUpperCase() } })

      if (response) {
        return next(new AppError('The registry exists', 409))
      }

      const transaction = await sequelize.transaction();

      const Producto = await models.Producto.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        id_categoria: req.body.id_categoria,
        id_proveedor: req.body.id_proveedor,
        precio_entrada: req.body.precio_entrada
      }, { transaction })

      const Movimiento = await models.Movimiento.create({
        tipo_movimiento: 1,
        descripcion: `Entrada de producto: ${req.body.nombre}`,
        fecha: req.body.fecha,
        id_persona: req.usuario.id
      }, { transaction })


      const MovimientoDetalle = await models.MovimientoDetalle.create({
        id_movimiento: Movimiento.id,
        id_producto: Producto.id,
        cantidad: req.body.cantidad,
        precio_entrada_unitario: Producto.precio_entrada,
        porcentaje_ganancia: 0,
        precio_salida_unitario: 0,
        total: Producto.precio_entrada * req.body.cantidad
      }, { transaction })

      // console.log(req.body)

      await models.Inventario.create({
        id_producto: Producto.id,
        cantidad: MovimientoDetalle.cantidad
      }, { transaction })

      await transaction.commit()

      response = Producto.toJSON()
      delete response.updatedAt
      delete response.deletedAt

      return responseHandler.created(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));      
    }

  }

  static async getAll(req, res, next) {
    try {
      const response = await models.Producto.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
      })

      return responseHandler.ok(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Producto.findByPk(id, {
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      return responseHandler.ok(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }

  static async Update(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Producto.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      response.codigo = req.body.codigo,
        response.nombre = req.body.nombre,
        response.descripcion = req.body.descripcion,
        response.id_categoria = req.body.id_categoria,
        response.id_proveedor = req.body.id_proveedor,
        response.precio_entrada = req.body.precio_entrada

      await response.save()

      return responseHandler.updated(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }


  static async Delete(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Producto.findByPk(id)

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      await response.destroy()

      return responseHandler.deleted(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }


}


module.exports = ProductoController