const { Persona, PersonaSchema } = require('./Persona')
const { Pais, PaisSchema } = require('./Pais')
const { Estado, EstadoSchema } = require('./Estado')


const initModels = (sequelize) => {
  const models = {
    Pais: Pais.init(PaisSchema, Pais.config(sequelize)),
    Persona: Persona.init(PersonaSchema, Persona.config(sequelize)),
    Estado: Estado.init(EstadoSchema, Estado.config(sequelize))
  }

  Object.values((models)).forEach((model) => {
    if (model.associate) {
      model.associate(models)
    }
  })

  return models
}

module.exports = initModels