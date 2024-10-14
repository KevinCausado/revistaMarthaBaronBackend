const AppError = require('../../utils/AppError')
const { sequelize, models } = require('../../config/sequelize')

class ProductoController {

  static async create(req, res, next) {
    try {
      let response = await models.Producto.findOne({ where: { codigo: req.body.codigo } })

      if (response) {
        return next(new AppError('El registro existe', 409))
      }

      const transaction = await sequelize.transaction();

      const Producto = await models.Producto.create({
        codigo: req.body.codigo, 
        nombre: req.body.nombre, 
        descripcion: req.body.descripcion, 
        id_categoria: req.body.id_categoria, 
        id_proveedor: req.body.id_proveedor, 
        precio_entrada: req.body.precio_entrada 
      }, { transaction })

      const Movimiento = await models.Movimiento.create({
        tipo_movimiento: 1,
        descripcion: 'Movimiento de Entrada',
        fecha: req.body.fecha,     
        id_persona: req.usuario.id
      }, { transaction })


      await models.MovimientoDetalle.create({
        id_movimiento: Movimiento.id,
        id_producto: Producto.id,
        cantidad: req.body.cantidad,
        precio_entrada_unitario: Producto.precio_entrada,
        porcentaje_ganancia: 0,
        precio_salida_unitario: 0,
        total: Producto.precio_entrada * req.body.cantidad
      }, { transaction })

      // console.log(req.body)

      await transaction.commit()

      response = Producto.toJSON()
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

      // return next(new AppError(error.message, error.statusCode))
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
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Error de validación: ${messages.join(', ')}`, 400));
      }

      // Manejar otros errores
      return next(new AppError('Error interno del servidor', 500));
    }

  }


}


module.exports = ProductoController