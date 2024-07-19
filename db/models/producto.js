'use strict';
const {
  Model
} = require('sequelize');

const sequelize = require('../../config/database');

module.exports = sequelize.defines('Producto',{
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: Sequelize.INTEGER
  },
  descripcion: {
    type: Sequelize.STRING
  },
  idCategoria: {
    type: Sequelize.INTEGER
  },
  idProveedor: {
    type: Sequelize.INTEGER
  },
  vlrUnitario: {
    type: Sequelize.DECIMAL
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
  modelName:'Producto',
  schema: 'revista'
})