'use strict';
const {
  Model,
  Sequelize
} = require('sequelize');

const sequelize = require('../../config/database')

module.exports= sequelize.define('Categoria',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  nombre: {
    type: Sequelize.STRING
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
  paranoid:true, //SoftDelete
  modelName:'Categoria',
  tableName:'categorias',  
})