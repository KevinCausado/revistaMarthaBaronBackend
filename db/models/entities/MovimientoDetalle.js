'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class MovimientoDetalle extends Model {

  static associate(models) {
     this.belongsTo(models.Movimiento,{
      foreignKey:'id_movimiento',
      as:'movimiento_detalle'
     }),
     this.belongsTo(models.Producto,{
      foreignKey:'id_producto',
      as:'movimiento_detalle_producto'
     })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'MovimientoDetalle',
      tableName: 'movimiento_detalle',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const MovimientoDetalleSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  id_movimiento: {
    type: DataTypes.INTEGER,
    References:{
      model:'Movimiento',
      key:'id'
    }
  },
  id_producto: {
    type: DataTypes.INTEGER
  },
  cantidad: {
    type: DataTypes.INTEGER
  },
  precio_entrada_unitario: {
    type: DataTypes.DOUBLE
  },
  porcentaje_ganancia: {
    type: DataTypes.INTEGER
  },
  precio_salida_unitario: {
    type: DataTypes.DOUBLE
  },
  total: {
    type: DataTypes.DOUBLE
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
    allowNull: false,
    type: DataTypes.DATE
  }

}

module.exports = { MovimientoDetalle, MovimientoDetalleSchema }