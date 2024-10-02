const AppError = require('../../utils/AppError')
const {models} = require('../../config/sequelize')

class EstadoController {

  static async create(req, res, next) {
    try {
      const response = await models.Estado.create({
        id_pais: req.body.id_pais,
        nombre: req.body.nombre
      })

      const result = response.toJSON()

      return res.status(200).json({
        Estado: 'Success',
        Mensaje: 'Registro creado con exito',
        Datos: result
      })
    } catch (error) {
      return next (new AppError(error.message,400))
    }

  }

}


module.exports = EstadoController