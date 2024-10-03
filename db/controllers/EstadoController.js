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
        status: 'Success',
        mesage: 'Registro creado con exito',
        data: result
      })
    } catch (error) {
      return next (new AppError(error.message,error.status))
    }

  }

}


module.exports = EstadoController