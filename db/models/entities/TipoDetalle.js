'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class TipoDetalle extends Model {

  static associate(models) {
    this.belongsTo(models.Tipo,{
      foreignKey:'id_tipo',
      as:'tipo_detalle'
     }),

     this.hasOne(models.Persona,{
      foreignKey:'tipo_documento',
      as:'persona_tipo_documento'
    }),

    this.hasOne(models.Movimiento,{
      foreignKey:'tipo_movimiento',
      as:'tipo_movimiento_detalle'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'TipoDetalle',
      tableName: 'tipo_detalle',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const TipoDetalleSchema = {

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
  id_tipo: {
    type: DataTypes.INTEGER,
    References:{
      model:'Tipo',
      key:'id'
    }
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

module.exports = { TipoDetalle, TipoDetalleSchema }


