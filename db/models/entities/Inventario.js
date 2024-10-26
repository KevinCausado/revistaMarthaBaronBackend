'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Inventario extends Model {

  static associate(models) {
    this.belongsTo(models.Producto, {
      foreignKey: 'id_producto',
      as: 'inventario_producto'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Inventario',
      tableName: 'inventario',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const InventarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  id_producto: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new AppError(`The field '${fieldName}' cannot be empty`,400);
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
            throw new AppError(`The field '${fieldName}' cannot be empty`,400);
          }
          if (value < 0 ) {
            throw new AppError(`Field '${fieldName}': You cannot sell products without stock`,400);
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

module.exports = { Inventario, InventarioSchema }
