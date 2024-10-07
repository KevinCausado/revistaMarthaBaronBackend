const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class PaisController {

  static async create(req, res, next) {
    try {
      const response = await models.Pais.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre
      })

      const result = response.toJSON()

      return res.status(200).json({
        status: 'Success',
        message: 'Registro creado',
        data: result
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }

  static async getAll(req, res, next) {
    try {
      const response = await models.Pais.findAll()

      return res.status(200).json({
        status: 'Success',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }

}


module.exports = PaisController