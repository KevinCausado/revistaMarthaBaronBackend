'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Persona extends Model {

  static associate(models) {
    // define association here
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Persona',
      tableName: 'persona',
      schema: process.env.DB_SCHEMA,
      paranoid:true
    }
  }
}

const PersonaSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  primer_nombre: {
    type: DataTypes.STRING
  },
  segundo_nombre: {
    type: DataTypes.STRING
  },
  primer_apellido: {
    type: DataTypes.STRING
  },
  email: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  direccion: {
    type: DataTypes.STRING
  },
  rol: {
    type: DataTypes.STRING
  },
  id_ciudad_municipio: {
    type: DataTypes.INTEGER
  },
  id_ciudad_departamento: {
    type: DataTypes.INTEGER
  },
  id_pais: {
    type: DataTypes.INTEGER
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    allowNull:true,
    type: DataTypes.DATE
  }
}

module.exports = { Persona, PersonaSchema }

