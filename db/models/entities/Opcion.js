'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Opcion extends Model {
  static associate(models) {
    this.belongsToMany(models.Rol, {
      through: {
        model: 'opcion_rol',
        unique: false
      },
      foreignKey: 'id_opcion',
      otherKey: 'id_rol',
      as: 'opcion_opcion_rol',
      indexes: {
        unique: true,
        fields: ['id_opcion', 'id_rol']
      }
    }),    
      this.belongsToMany(models.Permiso, {
        through: {
          model: 'opcion_permiso',
          unique: false
        },
        foreignKey: 'id_opcion',
        otherKey: 'id_permiso',
        as: 'opcion_opcion_permiso',
        indexes: {
          unique: true,
          fields: ['id_opcion', 'id_permiso']
        }
      })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Opcion',
      tableName: 'opcion',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const OpcionSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
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
            throw new AppError(`The field '${fieldName}' cannot be empty`, 400);
          }
        }
      }
    }
  },
  id_padre: {
    allowNull: true,
    notEmpty: true,
    type: DataTypes.INTEGER,
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

module.exports = { Opcion, OpcionSchema }




