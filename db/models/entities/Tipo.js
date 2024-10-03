'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Tipo extends Model {

  static associate(models) {
     this.hasMany(models.TipoDetalle,{
      foreignKey:'id_tipo',
      as:'tipo_detalle'
     })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Tipo',
      tableName: 'tipo',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const TipoSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
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

module.exports = { Tipo, TipoSchema }


