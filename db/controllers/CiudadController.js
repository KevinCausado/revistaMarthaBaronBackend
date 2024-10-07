const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class CiudadController {

  static async create(req, res, next) {
    try {
      const response = await models.Ciudad.create({
        id_estado: req.body.id_estado,
        nombre: req.body.nombre
      })

      const result = response.toJSON()

      return res.status(200).json({
        status: 'Success',
        message: 'Registro creado con exito',
        data: result
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }

  static async getAll(req, res, next) {
    try {
      const response = await models.Ciudad.findAll()   

      return res.status(200).json({
        status: 'Success',        
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }

}


module.exports = CiudadController