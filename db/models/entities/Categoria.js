'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

  class Categoria extends Model {
    
    static associate(models) {
      this.hasMany(models.Producto,{
        foreignKey:'id_categoria',
        as:'producto_categoria'
      })
    }

    static config(sequelize) {
      return {
        sequelize,
        modelName: 'Categoria',
        tableName: 'categoria',
        schema: process.env.DB_SCHEMA,
        paranoid:true
      }
    }
  }

  const CategoriaSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    codigo: {
      type: DataTypes.STRING
    },
    descripcion: {
      type: DataTypes.TEXT
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

  module.exports = {Categoria,CategoriaSchema}