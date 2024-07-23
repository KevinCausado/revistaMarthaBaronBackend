'use strict';
const {
  Model,
  Sequelize,
  DataTypes
} = require('sequelize');

const sequelize = require('../../config/database')

module.exports= sequelize.define('Categoria',{
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
  paranoid:true, //SoftDelete
  modelName:'Categoria',
  tableName:'categorias',  
})