const AppError = require('../../utils/AppError')
const { sequelize, models } = require('../../config/sequelize')
const responseHandler = require('../../utils/responseHandler')

class MovimientoController {

  static async createEntrada(req, res, next) {
    try {
      const Producto = await models.Producto.findOne({ where: { id: req.body.id_producto } })

      if (!Producto) {
        return next(new AppError('El producto no existe', 404))
      }

      const transaction = await sequelize.transaction();

      const Movimiento = await models.Movimiento.create({
        tipo_movimiento: 1,
        descripcion: `Entrada de producto: ${Producto.nombre}`,
        fecha: req.body.fecha,
        id_persona: req.usuario.id
      }, { transaction })


      Producto.precio_entrada = req.body.precio_entrada
      await Producto.save({transaction})

      const MovimientoDetalle = await models.MovimientoDetalle.create({
        id_movimiento: Movimiento.id,
        id_producto: req.body.id_producto,
        cantidad: req.body.cantidad,
        precio_entrada_unitario: Producto.precio_entrada,
        porcentaje_ganancia: 0,
        precio_salida_unitario: 0,
        total: Producto.precio_entrada * req.body.cantidad
      }, { transaction })


      const Inventario = await models.Inventario.findOne({ where: { id_producto: Producto.id } })

      Inventario.id_producto = Producto.id
      Inventario.cantidad = Inventario.cantidad + MovimientoDetalle.cantidad

      await Inventario.save({transaction})

      await transaction.commit()

      const response = Movimiento.toJSON()
      delete response.updatedAt
      delete response.deletedAt

      return responseHandler.created(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }   

      return next(new AppError(error.message, error.statusCode));

    }

  }

  static async createSalida(req, res, next) {
    try {
      const Producto = await models.Producto.findOne({ where: { id: req.body.id_producto } })

      if (!Producto) {
        return next(new AppError('El producto no existe', 404))
      }

      const transaction = await sequelize.transaction();


      const Movimiento = await models.Movimiento.create({
        tipo_movimiento: 2,
        descripcion: `Salida de producto: ${Producto.nombre}`,
        fecha: req.body.fecha,
        id_persona: req.body.id_persona
      }, { transaction })

      const precio_salida_unitario = Producto.precio_entrada + (Producto.precio_entrada * (req.body.porcentaje_ganancia / 100))


      const MovimientoDetalle = await models.MovimientoDetalle.create({
        id_movimiento: Movimiento.id,
        id_producto: Producto.id,
        cantidad: req.body.cantidad,
        precio_entrada_unitario: Producto.precio_entrada,
        porcentaje_ganancia: req.body.porcentaje_ganancia,
        precio_salida_unitario: precio_salida_unitario,
        total: precio_salida_unitario * req.body.cantidad
      }, { transaction })
      
      let ganancia = 0
      ganancia = (MovimientoDetalle.precio_salida_unitario - MovimientoDetalle.precio_entrada_unitario) * MovimientoDetalle.cantidad

      Movimiento.ganancia = ganancia
      await Movimiento.save({ transaction })


      const Inventario = await models.Inventario.findOne({ where: { id_producto: Producto.id } })
      Inventario.id_producto = Producto.id
      Inventario.cantidad = Inventario.cantidad - MovimientoDetalle.cantidad
      await Inventario.save({transaction})
      await transaction.commit()

      const response = Movimiento.toJSON()
      delete response.updatedAt
      delete response.deletedAt
      

      return responseHandler.created(res,[response,ganancia])
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }   

      return next(new AppError(error.message, error.statusCode));

    }

  }

  static async getAll(req, res, next) {
    try {
      const response = await models.Movimiento.findAll({
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
      })

      return response.ok(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }   

      return next(new AppError(error.message, error.statusCode));

    }

  }

  static async getById(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Movimiento.findByPk(id, {
        attributes: {
          exclude: ['updatedAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      return responseHandler.ok(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }   

      return next(new AppError(error.message, error.statusCode));

    }

  }

  static async Update(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Movimiento.findByPk(id, {
        attributes: {
          exclude: ['createdAt', 'deletedAt']
        }
      })

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      response.tipo_movimiento = req.body.tipo_movimiento,
        response.descripcion = req.body.descripcion,
        response.fecha = req.body.fecha,
        response.id_persona = req.body.id_persona

      await response.save()

      return responseHandler.updated(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }   

      return next(new AppError(error.message, error.statusCode));

    }

  }


  static async Delete(req, res, next) {
    try {
      const id = req.params.id
      const response = await models.Movimiento.findByPk(id)

      if (!response) {
        return next(new AppError("The registry doesn't exist", 404))
      }

      await response.destroy()

      return responseHandler.deleted(res,response)
    } catch (error) {
      if (error.name === 'SequelizeValidationError') {
        const messages = error.errors.map(e => e.message);
        return next(new AppError(`Validation Error: ${messages.join(', ')}`, 400));
      }   

      return next(new AppError(error.message, error.statusCode));

    }

  }


}


module.exports = MovimientoController