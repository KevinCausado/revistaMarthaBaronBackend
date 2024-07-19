"use strict";
const { Model, Sequelize } = require("sequelize");
const sequelize = require('../../config/database');

module.exports = sequelize.define('Proveedor',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nombre: {
    type: Sequelize.STRING
  },
  direccion: {
    type: Sequelize.STRING
  },
  ciudad: {
    type: Sequelize.STRING
  }, 
  estado:{
    alowNull:false,
    type:Sequelize.ENUM('A','I'),
    defaultValue:'A'
  },     
  createdAt: {
    allowNull: false,
    type: Sequelize.DATE
  },     
  updatedAt: {        
    type: Sequelize.DATE
  },
  deletedAt: {       
    type: Sequelize.DATE
  },
},{
  paranoid:true,
  modelName:'Proveedor',
  schema: 'revista'
})
