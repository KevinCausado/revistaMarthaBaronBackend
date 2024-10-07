const { Usuario, UsuarioSchema } = require('./entities/Usuario')
const { Tipo, TipoSchema } = require('./entities/Tipo')
const { TipoDetalle, TipoDetalleSchema } = require('./entities/TipoDetalle')
const { Persona, PersonaSchema } = require('./entities/Persona')
const { Pais, PaisSchema } = require('./entities/Pais')
const { Estado, EstadoSchema } = require('./entities/Estado')
const { Ciudad, CiudadSchema } = require('./entities/Ciudad')
const { Categoria, CategoriaSchema } = require('./entities/Categoria')
const {Proveedor,ProveedorSchema} = require('./entities/Proveedor')
const {Producto,ProductoSchema} = require('./entities/Producto')
const {Movimiento,MovimientoSchema} = require('./entities/Movimiento')
const {MovimientoDetalle,MovimientoDetalleSchema} = require('./entities/MovimientoDetalle')
const {Inventario,InventarioSchema} = require('./entities/Inventario')


const initModels = (sequelize) => {
  const models = {
    Usuario : Usuario.init(UsuarioSchema,Usuario.config(sequelize)),
    Tipo : Tipo.init(TipoSchema,Tipo.config(sequelize)),
    TipoDetalle : TipoDetalle.init(TipoDetalleSchema,TipoDetalle.config(sequelize)),
    Persona: Persona.init(PersonaSchema, Persona.config(sequelize)),
    Pais: Pais.init(PaisSchema, Pais.config(sequelize)),
    Estado: Estado.init(EstadoSchema, Estado.config(sequelize)),
    Ciudad: Ciudad.init(CiudadSchema, Ciudad.config(sequelize)),
    Categoria: Categoria.init(CategoriaSchema, Categoria.config(sequelize)),
    Proveedor: Proveedor.init(ProveedorSchema, Proveedor.config(sequelize)),
    Producto: Producto.init(ProductoSchema, Producto.config(sequelize)),
    Movimiento: Movimiento.init(MovimientoSchema, Movimiento.config(sequelize)),
    MovimientoDetalle: MovimientoDetalle.init(MovimientoDetalleSchema, MovimientoDetalle.config(sequelize)),
    Inventario: Inventario.init(InventarioSchema, Inventario.config(sequelize))
  }

  Object.values((models)).forEach((model) => {
    if (model.associate) {
      model.associate(models)
    }
  })

  return models
}

module.exports = initModels