//Tipo
//TipoDetalle
const { Persona, PersonaSchema } = require('./Persona')
const { Pais, PaisSchema } = require('./Pais')
const { Estado, EstadoSchema } = require('./Estado')
const { Ciudad, CiudadSchema } = require('./Ciudad')
const { Categoria, CategoriaSchema } = require('./Categoria')
const {Proveedor,ProveedorSchema} = require('./Proveedor')
const {Producto,ProductoSchema} = require('./Producto')

const initModels = (sequelize) => {
  const models = {
    Persona: Persona.init(PersonaSchema, Persona.config(sequelize)),
    Pais: Pais.init(PaisSchema, Pais.config(sequelize)),
    Estado: Estado.init(EstadoSchema, Estado.config(sequelize)),
    Ciudad: Ciudad.init(CiudadSchema, Ciudad.config(sequelize)),
    Categoria: Categoria.init(CategoriaSchema, Categoria.config(sequelize)),
    Proveedor: Proveedor.init(ProveedorSchema, Proveedor.config(sequelize)),
    Producto: Producto.init(ProductoSchema, Producto.config(sequelize))
  }

  Object.values((models)).forEach((model) => {
    if (model.associate) {
      model.associate(models)
    }
  })

  return models
}

module.exports = initModels