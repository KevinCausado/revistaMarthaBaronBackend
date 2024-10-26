const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')

class CategoriaController {

  static async create(req, res, next) {
    try {
      let response = await models.Categoria.findOne({ where: { codigo: req.body.codigo } })

      if (response) {
        return next(new AppError('The registry exists', 409))
      }

      response = await models.Categoria.create({
        codigo: req.body.codigo,
        descripcion: req.body.descripcion
      })

      response = response.toJSON()
      delete response.updatedAt
      delete response.deletedAt

      return responseHandler.created(res, data)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }

  static async getAll(req, res, next) {
    try {
      const response = await models.Categoria.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
      })

      return responseHandler.ok(res, data)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Categoria.findByPk(id, {
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      return responseHandler.ok(res,data)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }

  static async Update(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Categoria.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      response.codigo = req.body.codigo
      response.descripcion = req.body.descripcion

      await response.save()

     return responseHandler.updated(res,data)
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
      const response = await models.Categoria.findByPk(id)

      if (!response) {
        return next(new AppError('El registro no existe', 404))
      }

      await response.destroy()

      return responseHandler.deleted(res,data)
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


module.exports = CategoriaController