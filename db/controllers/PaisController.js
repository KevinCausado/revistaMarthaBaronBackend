const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class PaisController {

  static async create(req, res, next) {
    try {
      let response = await models.Pais.findOne({ where: { nombre: req.body.nombre } })

      if (response) {
        return next(new AppError('El registro existe', 409))
      }

      response = await models.Pais.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre
      })

      response = response.toJSON()
      delete response.updatedAt
      delete response.deletedAt

      return res.status(200).json({
        status: 'Success',
        message: 'Registro creado',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
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

      return res.status(200).json({
        status: 'Success',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
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
        return next(new AppError('El registro no existe', 404))
      }

      return res.status(200).json({
        status: 'Success',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
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
        return next(new AppError('El registro no existe', 404))
      }

      response.codigo = req.body.codigo
      response.nombre = req.body.nombre

      await response.save()

      return res.status(200).json({
        status: 'Success',
        message: 'Registro actualizado',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }


  static async Delete(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Pais.findByPk(id)

      if (!response) {
        return next(new AppError('El registro no existe', 404))
      }

      await response.destroy()

      return res.status(200).json({
        status: 'Success',
        message: 'Registro eliminado'
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }


}


module.exports = PaisController