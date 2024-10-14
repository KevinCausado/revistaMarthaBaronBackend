const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class PersonaController {

  static async create(req, res, next) {
    try {
      let response = await models.Persona.findOne({ where: { documento: req.body.documento } })

      if (response) {
        return next(new AppError('El registro existe', 409))
      }

      response = await models.Persona.create({
        tipo_documento: req.body.tipo_documento,
        documento: req.body.documento,
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
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError('Error interno del servidor', 500));
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
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError('Error interno del servidor', 500));
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
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError('Error interno del servidor', 500));
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

        response.tipo_documento = req.body.tipo_documento,
        response.documento = req.body.documento,
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
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError('Error interno del servidor', 500));
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
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError('Error interno del servidor', 500));
    }

  }


}


module.exports = PersonaController