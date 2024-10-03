'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Ciudad extends Model {

  static associate(models) {

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


