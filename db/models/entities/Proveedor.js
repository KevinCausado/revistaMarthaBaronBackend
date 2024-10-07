'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Proveedor extends Model {

  static associate(models) {
    this.hasMany(models.Producto,{
      foreignKey:'id_proveedor',
      as:'producto_proveedor'
    }),
    this.belongsTo(models.Ciudad,{
      foreignKey:'id_ciudad',
      as:'proveedor_ciudad'
    }),
    this.hasMany(models.Movimiento,{
      foreignKey:'id_proveedor',
      as:'movimiento_proveedor'
     })    
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
    type: DataTypes.INTEGER,
    References:{
      model:'TipoDetalle',
      key:'id'
    }
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

module.exports = { Proveedor, ProveedorSchema }


