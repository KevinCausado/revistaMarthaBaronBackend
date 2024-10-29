const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')

class PaisController {

  static async create(req, res, next) {
    try {
      let response = await models.Pais.findOne({ where: { nombre: req.body.nombre.toUpperCase() } })

      if (response) {
        return next(new AppError('The registry exists', 409))
      }

      response = await models.Pais.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre
      })

      response = response.toJSON()
      delete response.updatedAt
      delete response.deletedAt

      return responseHandler.created(res, response)

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
      const response = await models.Pais.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        },
        include:
          [
            {
              model: models.Estado,
              as: 'pais_estado',
              attributes: ['nombre'],
              include:
                [
                  {
                    model: models.Ciudad,
                    as: 'ciudad_estado',
                    attributes: ['nombre']
                  }
                ]
            },

          ],
      })

      return responseHandler.ok(res, response)
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
      const response = await models.Pais.findByPk(id, {
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        },
        include:
          [
            {
              model: models.Estado,
              as: 'pais_estado',
              attributes: ['nombre'],
              include:
                [
                  {
                    model: models.Ciudad,
                    as: 'ciudad_estado',
                    attributes: ['nombre']
                  }
                ]
            },

          ],
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      return responseHandler.ok(res, response)
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
      const response = await models.Pais.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      response.codigo = req.body.codigo
      response.nombre = req.body.nombre

      await response.save()

      return responseHandler.updated(res, response)
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
      const response = await models.Pais.findByPk(id)

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


module.exports = PaisController