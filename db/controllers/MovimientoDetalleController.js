const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')

class MovimientoDetalleController {

  static async create(req, res, next) {
    try {
      let response = await models.MovimientoDetalle.findOne({ where: { id_movimiento: req.body.id_movimiento } })

      if (response) {
        return next(new AppError('The registry exists', 409))
      }

      response = await models.MovimientoDetalle.create({
        id_movimiento: req.body.id_movimiento,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        precio_entrada_unitario: req.body.precio_entrada_unitario,
        porcentaje_ganancia: req.body.porcentaje_ganancia,
        precio_salida_unitario: req.body.precio_salida_unitario,
        total: req.body.total
      })

      response = response.toJSON()
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
      const response = await models.MovimientoDetalle.findAll({
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
      const response = await models.MovimientoDetalle.findByPk(id, {
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
      const response = await models.MovimientoDetalle.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      response.id_movimiento = req.body.id_movimiento,
        response.id_producto = req.body.id_producto,
        response.cantidad = req.body.cantidad,
        response.precio_entrada_unitario = req.body.precio_entrada_unitario,
        response.porcentaje_ganancia = req.body.porcentaje_ganancia,
        response.precio_salida_unitario = req.body.precio_salida_unitario,
        response.total = req.body.total

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
      const response = await models.MovimientoDetalle.findByPk(id)

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

  static async getBalance(req, res, next) {
    try {

      const totalEntradas = await models.MovimientoDetalle.sum('total', {
        include: [{
          model: models.Movimiento,
          as: 'movimiento_detalle',
          attributes: [],
          where: { tipo_movimiento: 1 }
        }]
      })

      const totalSalidas = await models.MovimientoDetalle.sum('total', {
        include: [{
          model: models.Movimiento,
          as: 'movimiento_detalle',
          attributes: [],
          where: { tipo_movimiento: 2 }
        }]
      })

      const balanceGeneral = totalSalidas - totalEntradas

      return res.status(200).json({
        status: 'OK',
        message: 'Balance General',
        data: { totalEntradas, totalSalidas, balanceGeneral }
      })
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }

      return next(new AppError(error.message, error.statusCode));

    }

  }

  static async getBalanceByProduct(req, res, next) {
    try {
      const id_producto = req.params.id
      const Producto = await models.Producto.findByPk(id_producto)

      if (!Producto) {
        return next(new AppError("The 'product' doesn't exist", 400))
      }

      const totalEntradas = await models.MovimientoDetalle.sum('total', {
        where:{id_producto:Producto.id},
        include: [{
          model: models.Movimiento,
          as: 'movimiento_detalle',
          attributes: [],
          where: { tipo_movimiento: 1 },
        }]
      })

      const totalSalidas = await models.MovimientoDetalle.sum('total', {
        where:{id_producto:Producto.id},
        include: [{
          model: models.Movimiento,
          as: 'movimiento_detalle',
          attributes: [],
          where: { tipo_movimiento: 2 },
        }]
      })

      const balanceGeneral = totalSalidas - totalEntradas

      return res.status(200).json({
        status: 'OK',
        message: `Balance General: ${Producto.nombre}`,
        data: { totalEntradas, totalSalidas, balanceGeneral }
      })
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }

      return next(new AppError(error.message, error.statusCode));

    }

  }


}


module.exports = MovimientoDetalleController