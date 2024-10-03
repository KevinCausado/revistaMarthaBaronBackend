'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Proveedor extends Model {

  static associate(models) {

  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Proveedor',
      tableName: 'proveedor',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const ProveedorSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  codigo: {
    type: DataTypes.STRING
  },
  tipo_servicio: {
    type: DataTypes.STRING
  },
  nombre: {
    type: DataTypes.STRING
  },
  direccion: {
    type: DataTypes.TEXT
  },
  email: {
    type: DataTypes.STRING
  },
  telefono: {
    type: DataTypes.STRING
  },
  id_ciudad: {
    type: DataTypes.INTEGER
  },
  id_estado: {
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
    type: DataTypes.DATE
  }
}

module.exports = { Proveedor, ProveedorSchema }


