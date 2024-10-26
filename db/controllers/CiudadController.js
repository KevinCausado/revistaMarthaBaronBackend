const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')

class CiudadController {

  static async create(req, res, next) {
    try {
      let response = await models.Ciudad.findOne({ where: { nombre: req.body.nombre } })

      if (response) {
        return next(new AppError('The registry exists', 409))
      }

      response = await models.Ciudad.create({
        id_estado: req.body.id_estado,
        nombre: req.body.nombre
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
      const response = await models.Ciudad.findAll({
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
      const response = await models.Ciudad.findByPk(id, {
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
      const response = await models.Ciudad.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      response.id_estado = req.body.id_estado
      response.nombre = req.body.nombre

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
      const response = await models.Ciudad.findByPk(id)

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


module.exports = CiudadController