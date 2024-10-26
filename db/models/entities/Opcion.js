'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Opcion extends Model {

  static associate(models) {
    this.hasMany(models.Estado, {
      foreignKey: 'id_pais',
      as: 'pais_estado'
    }),

    this.belongsToMany(models.Rol, {
      through:'opcion_rol',
      foreignKey: 'id_opcion',
      otherKey:'id_rol',      
      as: 'opcion_opcion_rol'
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
            throw new AppError(`The field '${fieldName}' cannot be empty`,400);
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




