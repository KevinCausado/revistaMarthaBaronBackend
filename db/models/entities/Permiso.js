'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Permiso extends Model {

  static associate(models) {    
    this.belongsToMany(models.Opcion, {
      through:'opcion_permiso',
      foreignKey: 'id_permiso',
      otherKey:'id_opcion',      
      as: 'permiso_opcion_permiso'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Permiso',
      tableName: 'permiso',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const PermisoSchema = {
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

module.exports = { Permiso, PermisoSchema }




