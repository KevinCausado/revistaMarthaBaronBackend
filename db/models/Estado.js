'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Estado extends Model {

  static associate(models) {
    this.belongsTo(models.Pais,{
      foreignKey:'id_pais',
      as:'pais_estado'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Estado',
      tableName: 'estado',
      schema: process.env.DB_SCHEMA,
      paranoid:true
    }
  }
}

const EstadoSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  id_pais: {
    type: DataTypes.INTEGER,
    References:{
      model:'Pais',
      key:'id'
    }
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

module.exports = { Estado, EstadoSchema }


