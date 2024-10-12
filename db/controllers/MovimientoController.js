const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class MovimientoController {

  static async create(req, res, next) {
    try {
      // let response = await models.Movimiento.findOne({ where: { codigo: req.body.codigo } })

      // if (response) {
      //   return next(new AppError('El registro existe', 409))
      // }

      let response = await models.Movimiento.create({
        tipo_movimiento: req.body.tipo_movimiento,
        descripcion: req.body.descripcion,
        fecha: req.body.fecha,
        id_proveedor: req.body.id_proveedor,
        id_persona: req.body.id_persona
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
      const response = await models.Movimiento.findAll({
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
      const response = await models.Movimiento.findByPk(id, {
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
      const response = await models.Movimiento.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError('El registro no existe', 404))
      }

      response.tipo_movimiento = req.body.tipo_movimiento,
      response.descripcion = req.body.descripcion,
      response.fecha = req.body.fecha,
      response.id_proveedor = req.body.id_proveedor,
      response.id_persona = req.body.id_persona

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
      const response = await models.Movimiento.findByPk(id)

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


module.exports = MovimientoController