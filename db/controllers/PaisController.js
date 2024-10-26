const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')

class PaisController {

  static async create(req, res, next) {
    try {
      let data = await models.Pais.findOne({ where: { nombre: req.body.nombre } })

      if (data) {
        return next(new AppError('El registro existe', 409))
      }

      data = await models.Pais.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre
      })

      data = data.toJSON()
      delete data.updatedAt
      delete data.deletedAt

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
      const data = await models.Pais.findAll({
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
      const data = await models.Pais.findByPk(id, {
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

      if (!data) {
        return next(new AppError('El registro no existe', 404))
      }

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

  static async Update(req, res, next) {
    try {
      const id = req.params.id
      const data = await models.Pais.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!data) {
        return next(new AppError('El registro no existe', 404))
      }

      data.codigo = req.body.codigo
      data.nombre = req.body.nombre

      await data.save()

      return responseHandler.updated(res, data)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }


  static async Delete(req, res, next) {
    try {
      const id = req.params.id
      const data = await models.Pais.findByPk(id)

      if (!data) {
        return next(new AppError('El registro no existe', 404))
      }

      await data.destroy()

      return responseHandler.deleted(res,data)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError(error.message, error.statusCode));
    }

  }


}


module.exports = PaisController