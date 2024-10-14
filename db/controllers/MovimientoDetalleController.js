const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class MovimientoDetalleController {

  static async create(req, res, next) {
    try {
      let response = await models.MovimientoDetalle.findOne({ where: { id_movimiento: req.body.id_movimiento } })

      if (response) {
        return next(new AppError('El registro existe', 409))
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

      return res.status(200).json({
        status: 'Success',
        message: 'Registro creado',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }

  static async getAll(req, res, next) {
    try {
      const response = await models.MovimientoDetalle.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
      })

      return res.status(200).json({
        status: 'Success',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
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
        return next(new AppError('El registro no existe', 404))
      }

      return res.status(200).json({
        status: 'Success',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
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
        return next(new AppError('El registro no existe', 404))
      }

      response.id_movimiento = req.body.id_movimiento,
      response.id_producto = req.body.id_producto,
      response.cantidad = req.body.cantidad,
      response.precio_entrada_unitario = req.body.precio_entrada_unitario,
      response.porcentaje_ganancia = req.body.porcentaje_ganancia,
      response.precio_salida_unitario = req.body.precio_salida_unitario,
      response.total = req.body.total

      await response.save()

      return res.status(200).json({
        status: 'Success',
        message: 'Registro actualizado',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }


  static async Delete(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.MovimientoDetalle.findByPk(id)

      if (!response) {
        return next(new AppError('El registro no existe', 404))
      }

      await response.destroy()

      return res.status(200).json({
        status: 'Success',
        message: 'Registro eliminado'
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }


}


module.exports = MovimientoDetalleController