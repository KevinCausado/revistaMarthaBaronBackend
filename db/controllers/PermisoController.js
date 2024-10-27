const AppError = require('../../utils/AppError')
const { models, sequelize } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')


class PermisoController {

  static async create(req, res, next) {
    try {
      var response = await models.Permiso.findOne({where: { nombre: req.body.nombre }})
      var Opcion = await models.Opcion.findOne({ where: { id: req.body.id_opcion } })

      if (!response) {
        if (!req.body.id_opcion) {
          return next(new AppError('Type "id_opcion"', 400))
        }

        if (!Opcion) {
          return next(new AppError("The 'option' doesn't exist", 404))
        }

        response = await models.Permiso.create({
          nombre: req.body.nombre
        })

        await response.setPermiso_opcion_permiso([req.body.id_opcion])  // Inserta id_opcion en opcion_permiso
      } else {
         
        const relationExists = await models.sequelize.query(
          'SELECT * FROM "revista"."opcion_permiso" WHERE id_permiso = ? AND id_opcion = ?',
          {
            replacements: [response.id, req.body.id_opcion],
            type: models.sequelize.QueryTypes.SELECT
          }
        );

        if (relationExists.length > 0) {
          return next(new AppError("'Option' is assigned to 'Permission'", 400));
        }

        await response.addPermiso_opcion_permiso([req.body.id_opcion])  // Inserta id_opcion en opcion_permiso

        response = response.toJSON()
        delete response.updatedAt
        delete response.deletedAt
      }      
     
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
      const response = await models.Permiso.findAll({
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
      const response = await models.Permiso.findByPk(id, {
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
      const response = await models.Permiso.findByPk(id, {
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
      const response = await models.Permiso.findByPk(id)

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


module.exports = PermisoController