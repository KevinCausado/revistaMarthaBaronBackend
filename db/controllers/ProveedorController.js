const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class ProveedorController {

  static async create(req, res, next) {
    try {
      let response = await models.Proveedor.findOne({ where: { codigo: req.body.codigo } })

      if (response) {
        return next(new AppError('El registro existe', 409))
      }

      response = await models.Proveedor.create({
        tipo_servicio: req.body.tipo_servicio,
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        direccion: req.body.direccion,
        email: req.body.email,
        telefono: req.body.telefono,
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
      const response = await models.Proveedor.findAll({
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
      const response = await models.Proveedor.findByPk(id, {
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
      const response = await models.Proveedor.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError('El registro no existe', 404))
      }

      response.tipo_servicio= req.body.tipo_servicio,
      response.codigo= req.body.codigo,
      response.nombre= req.body.nombre,
      response.direccion= req.body.direccion,
      response.email= req.body.email,
      response.telefono= req.body.telefono,
      response.id_ciudad= req.body.id_ciudad

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
      const response = await models.Proveedor.findByPk(id)

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


module.exports = ProveedorController