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
        Estado: 'Success',
        Mensaje: 'Registro creado con exito',
        Datos: result
      })
    } catch (error) {
      return next(new AppError(error.message, 400))
    }

  }

  static async getAll(req, res, next) {
    try {
      const response = await models.Pais.findAll({
        attributes: ['codigo', 'nombre'],
        include: [
          {
          model: models.Estado,
          as: 'pais_estado',
          attributes: ['nombre']
        }]
      })   

      return res.status(200).json({
        Estado: 'Success',        
        Datos: response
      })
    } catch (error) {
      return next(new AppError(error.message, 400))
    }

  }

}


module.exports = PaisController