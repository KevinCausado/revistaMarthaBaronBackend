'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class MovimientoDetalle extends Model {

  static associate(models) {
    this.belongsTo(models.Movimiento, {
      foreignKey: 'id_movimiento',
      as: 'movimiento_detalle'
    }),
      this.belongsTo(models.Producto, {
        foreignKey: 'id_producto',
        as: 'movimiento_detalle_producto'
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
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    References: {
      model: 'Movimiento',
      key: 'id'
    },
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new AppError(`El campo "${fieldName}" no puede estar vacío`,400);
          }
        }
      }
    }
  },
  id_producto: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    References: {
      model: 'Producto',
      key: 'id'
    },
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new AppError(`El campo "${fieldName}" no puede estar vacío`,400);
          }
        }
      }
    }
  },
  cantidad: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new AppError(`El campo "${fieldName}" no puede estar vacío`,400);
          }
        }
      }
    }
  },
  precio_entrada_unitario: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.DOUBLE,
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new AppError(`El campo "${fieldName}" no puede estar vacío`,400);
          }
        }
      }
    }
  },
  porcentaje_ganancia: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new Error(`El campo "${fieldName}" no puede estar vacío`);
          }
          if (value < 0 || value > 100) {
            throw new AppError(`Campo "${fieldName}": El porcentaje debe estar entre 0 y 100.`,400);
          }
        }
      },      
    }
  },
  precio_salida_unitario: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.DOUBLE,
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new AppError(`El campo "${fieldName}" no puede estar vacío`,400);
          }
        }
      }
    }
  },
  total: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.DOUBLE,
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new AppError(`El campo "${fieldName}" no puede estar vacío`,400);
          }
        }
      }
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

module.exports = { MovimientoDetalle, MovimientoDetalleSchema }