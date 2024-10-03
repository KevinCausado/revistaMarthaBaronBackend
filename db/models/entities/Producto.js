'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Producto extends Model {

  static associate(models) {
    this.belongsTo(models.Categoria,{
      foreignKey:'id_categoria',
      as:'producto_categoria'
    }),
    this.belongsTo(models.Proveedor,{
      foreignKey:'id_proveedor',
      as:'producto_proveedor'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Producto',
      tableName: 'producto',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const ProductoSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  codigo: {
    type: DataTypes.STRING
  },
  nombre: {
    type: DataTypes.STRING
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  id_categoria: {
    type: DataTypes.INTEGER,
    References:{
      model:'Categoria',
      key:'id'
    }
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    References:{
      model:'Proveedor',
      key:'id'
    }
  },
  precio_entrada: {
    type: DataTypes.DOUBLE
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

module.exports = { Producto, ProductoSchema }


