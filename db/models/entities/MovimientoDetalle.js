'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');
const { toDefaultValue } = require('sequelize/lib/utils');

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
            throw new AppError(`The field '${fieldName}' cannot be empty`, 400);
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
            throw new AppError(`The field '${fieldName}' cannot be empty`, 400);
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
            throw new AppError(`The field '${fieldName}' cannot be empty`, 400);
          }
          if (value < 0) {
            throw new AppError(`Field '${fieldName}': You cannot sell products without stock`, 400);
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
            throw new AppError(`The field '${fieldName}' cannot be empty`, 400);
          }
          if (value < 0) {
            throw new AppError(`Campo "${fieldName}": No puedes colocar valores negativos.`, 400);
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
            throw new Error(`The field '${fieldName}' cannot be empty`);
          }
          if (value < 0 || value > 100) {
            throw new AppError(`Field '${fieldName}': The percentage must be between 0 and 100.`, 400);
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
            throw new AppError(`The field '${fieldName}' cannot be empty`, 400);
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
            throw new AppError(`The field '${fieldName}' cannot be empty`, 400);
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