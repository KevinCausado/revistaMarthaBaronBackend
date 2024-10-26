'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Pais extends Model {

  static associate(models) {
    this.hasMany(models.Estado, {
      foreignKey: 'id_pais',
      as: 'pais_estado'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Pais',
      tableName: 'pais',
      schema: process.env.DB_SCHEMA,
      paranoid: true
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
    allowNull: false,
    notEmpty: true,
    type: DataTypes.STRING,
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
  nombre: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.STRING,
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

module.exports = { Pais, PaisSchema }




