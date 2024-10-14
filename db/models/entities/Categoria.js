'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Categoria extends Model {

  static associate(models) {
    this.hasMany(models.Producto, {
      foreignKey: 'id_categoria',
      as: 'producto_categoria'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Categoria',
      tableName: 'categoria',
      schema: process.env.DB_SCHEMA,
      paranoid: true
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
    allowNull: false,
    notEmpty: true,
    type: DataTypes.STRING,
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
  descripcion: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.TEXT,
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
    type: DataTypes.DATE,
  },
  updatedAt: {
    allowNull: false,
    type: DataTypes.DATE
  },
  deletedAt: {
    type: DataTypes.DATE
  }
}

module.exports = { Categoria, CategoriaSchema }