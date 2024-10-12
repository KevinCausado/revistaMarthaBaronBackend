const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')
const { ROWLOCK } = require('sequelize/lib/table-hints')

class PersonaController {

  static async create(req, res, next) {
    try {
      let response = await models.Persona.findOne({ where: { nombre: req.body.nombre } })

      if (response) {
        return next(new AppError('El registro existe', 409))
      }

      response = await models.Persona.create({
        primer_nombre: req.body.primer_nombre,
        segundo_nombre: req.body.segundo_nombre,
        primer_apellido: req.body.primer_apellido,
        segundo_apellido: req.body.segundo_apellido,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        rol: req.body.rol,
        id_ciudad: req.body.id_ciudad
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
      const response = await models.Persona.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
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
      const response = await models.Persona.findByPk(id, {
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
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
      const response = await models.Persona.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError('El registro no existe', 404))
      }

      response.primer_nombre = req.body.primer_nombre,
      response.segundo_nombre = req.body.segundo_nombre,
      response.primer_apellido = req.body.primer_apellido,
      response.segundo_apellido = req.body.segundo_apellido,
      response.email = req.body.email,
      response.telefono = req.body.telefono,
      response.direccion = req.body.direccion,
      response.rol = req.body.rol,
      response.id_ciudad = req.body.id_ciudad

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
      const response = await models.Persona.findByPk(id)

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


module.exports = PersonaController