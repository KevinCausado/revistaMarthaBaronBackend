'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

  class Pais extends Model {
    
    static associate(models) {
      this.hasMany(models.Estado,{
        foreignKey:'id_pais',
        as:'pais_estado'
      })
    }

    static config(sequelize){
      return {
        sequelize,
        modelName:'Pais',
        tableName:'pais',
        schema:process.env.DB_SCHEMA,
        paranoid:true
      }
    }
  }

  const PaisSchema = {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER
    },
    codigo: {
      allowNull:false,
      type: DataTypes.STRING
    },
    nombre: {
      type: DataTypes.STRING
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
      allowNull:true,
      type: DataTypes.DATE
    }
  }

  module.exports = {Pais,PaisSchema}

  
  
  
