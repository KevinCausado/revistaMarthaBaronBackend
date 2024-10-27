const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')

class OpcionController {

  static async create(req, res, next) {
    try {
      var response = await models.Opcion.findOne({ where: { nombre: req.body.nombre } })

      if (!req.body.id_rol) {
        return next(new AppError('Type "id_rol"', 400))
      }

      const Rol = await models.Rol.findOne({ where: { id: req.body.id_rol } })

      if (!Rol) {
        return next(new AppError("The 'rol doesn't exist", 404))
      }

      if (!response) {
        if (req.body.id_padre !== null) {
          const searchParent = await models.Opcion.findOne({ where: { id: req.body.id_padre } })

          if (!searchParent) {
            return next(new AppError("The 'padre_id' doesn't exist", 404))
          }
        }

        response = await models.Opcion.create({
          nombre: req.body.nombre,
          id_padre: req.body.id_padre
        })

        await response.setOpcion_opcion_rol([req.body.id_rol])  // Inserta id_rol en opcion_rol
      } else {

        const relationExists = await models.sequelize.query(
          'SELECT * FROM "revista"."opcion_rol" WHERE id_rol = ? AND id_opcion = ?',
          {
            replacements: [Rol.id, response.id],
            type: models.sequelize.QueryTypes.SELECT
          }
        );

        if (relationExists.length > 0) {
          return next(new AppError("'Role' is assigned to 'Option'", 400));
        }

        await response.addOpcion_opcion_rol([req.body.id_rol])  // Inserta id_rol en opcion_rol        
      }

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
      const response = await models.Opcion.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
      })

      const tree = (parent_id = null) => {
        return response.filter((option) => option.id_padre === parent_id).map((option) => (
          {
            id: option.id,
            option: option.nombre,
            childrens: tree(option.id)
          }
        ))
      }
      const buildTree = tree()
      return responseHandler.ok(res, buildTree)
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
      const response = await models.Opcion.findByPk(id, {
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
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
      const response = await models.Opcion.findByPk(id, {
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
      const response = await models.Opcion.findByPk(id)

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      await response.destroy()

      return responseHandler.deleted(res, response)
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


module.exports = OpcionController