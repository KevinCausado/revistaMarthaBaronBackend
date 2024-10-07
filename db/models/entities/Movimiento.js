'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Movimiento extends Model {

  static associate(models) {
    this.belongsTo(models.TipoDetalle,{
      foreignKey:'tipo_movimiento',
      as:'tipo_movimiento_detalle'
    }),
    this.hasOne(models.MovimientoDetalle,{
      foreignKey:'id_movimiento',
      as:'movimiento_detalle'
     }),
     this.belongsTo(models.Proveedor,{
      foreignKey:'id_proveedor',
      as:'movimiento_proveedor'
     }),
     this.belongsTo(models.Persona,{
      foreignKey:'id_persona',
      as:'movimiento_persona'
     })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName:'Movimiento',
      tableName:'movimiento',
      schema:process.env.DB_SCHEMA,
      paranoid:true
    }
  }
}

const MovimientoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  tipo_movimiento: {
    type: DataTypes.INTEGER,
    References:{
      model:'TipoDetalle',
      key:'id'
    }
  },
  descripcion: {
    type: DataTypes.TEXT
  },
  fecha: {
    type: DataTypes.DATE
  },
  id_proveedor: {
    type: DataTypes.INTEGER,
    References:{
      model:'Proveedor',
      key:'id'
    }
  },
  id_persona: {
    type: DataTypes.INTEGER,
    References:{
      model:'Persona',
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

module.exports = { Movimiento, MovimientoSchema }