const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class ProductoController {

  static async create(req, res, next) {
    try {
      let response = await models.Producto.findOne({ where: { codigo: req.body.codigo } })

      if (response) {
        return next(new AppError('El registro existe', 409))
      }

      response = await models.Producto.create({
        codigo: req.body.codigo,
        nombre: req.body.nombre,
        descripcion: req.body.descripcion,
        id_categoria: req.body.id_categoria,
        id_proveedor: req.body.id_proveedor,
        precio_entrada: req.body.precio_entrada
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
      const response = await models.Producto.findAll({
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
      const response = await models.Producto.findByPk(id, {
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
      const response = await models.Producto.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError('El registro no existe', 404))
      }

       response.codigo = req.body.codigo,
       response.nombre = req.body.nombre,
       response.descripcion = req.body.descripcion,
       response.id_categoria = req.body.id_categoria,
       response.id_proveedor = req.body.id_proveedor,
       response.precio_entrada = req.body.precio_entrada

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
      const response = await models.Producto.findByPk(id)

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


module.exports = ProductoController