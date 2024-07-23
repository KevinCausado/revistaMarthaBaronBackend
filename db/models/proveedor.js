"use strict";
const { Model, Sequelize, DataTypes } = require("sequelize");
const sequelize = require('../../config/database');

module.exports = sequelize.define('Proveedor',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  nombre: {
    allowNull: false,
    type: DataTypes.STRING
  },
  direccion: {
    allowNull: false,
    type: DataTypes.STRING
  },
  ciudad: {
    allowNull: false,
    type: DataTypes.STRING
  }, 
  estado:{
    alowNull:false,
    type:DataTypes.ENUM('A','I'),
    defaultValue:'A'
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
  modelName:'Proveedor',
  tableName:'proveedores'
})
