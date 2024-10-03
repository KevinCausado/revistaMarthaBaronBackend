'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Ciudad extends Model {

  static associate(models) {
    this.belongsTo(models.Estado,{
      foreignKey:'id_estado',
      as:'ciudad_estado'
    }),

    this.hasMany(models.Persona,{
      foreignKey:'id_ciudad',
      as:'persona_ciudad'
    }),

    this.hasMany(models.Proveedor,{
      foreignKey:'id_ciudad',
      as:'proveedor_ciudad'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Ciudad',
      tableName: 'ciudad',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const CiudadSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  id_estado: {
    type: DataTypes.INTEGER
  },
  nombre: {
    type: DataTypes.STRING
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

module.exports = { Ciudad, CiudadSchema }


