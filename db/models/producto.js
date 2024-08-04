'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

const sequelize = require('../../config/database');

module.exports = sequelize.defines('Producto',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  descripcion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  idCategoria: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  idProveedor: {
    allowNull: false,
    type: DataTypes.INTEGER
  },
  vlrUnitario: {
    allowNull: false,
    type: DataTypes.DECIMAL
  },
  createdAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  updatedAt: {        
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  },
  
},{
  paranoid:true,  
  tableName:'productos'  
})