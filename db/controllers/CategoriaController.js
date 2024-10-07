const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')

class CategoriaController {

  static async create(req, res, next) {
    try {
      const response = await models.Categoria.create({
        codigo: req.body.codigo,
        descripcion: req.body.descripcion
      })

      const result = response.toJSON()

      return res.status(200).json({
        status: 'Success',
        message: 'Registro creado',
        data: result
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }

  static async getAll(req, res, next) {
    try {
      const response = await models.Categoria.findAll()

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
      const response = await models.Categoria.findByPk(id)

      if (!response) {
        return next(new AppError('El registro no existe'))
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
      const response = await models.Categoria.findByPk(id)

      if (!response) {
        return next(new AppError('El registro no existe'))
      }

      response.codigo = req.body.codigo
      response.descripcion = req.body.descripcion

      await response.save()

      return res.status(200).json({
        status: 'Success',
        data: response
      })
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }


  static async Delete(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Categoria.findByPk(id)

      if (!response) {
        return next(new AppError('El registro no existe'))
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


module.exports = CategoriaController