'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Persona extends Model {

  static associate(models) {
    this.belongsTo(models.TipoDetalle,{
      foreignKey:'rol',
      as:'persona_detalle'
    }),
    this.belongsTo(models.Ciudad,{
      foreignKey:'id_ciudad',
      as:'persona_ciudad'
    })    
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
    type: DataTypes.INTEGER,
    References:{
      model:'TipoDetalle',
      key:'id'
    }
  },
  id_ciudad: {
    type: DataTypes.INTEGER,
    References:{
      model:'Ciudad',
      key:'id'
    }
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
    type: DataTypes.DATE
  }
}

module.exports = { Persona, PersonaSchema }

