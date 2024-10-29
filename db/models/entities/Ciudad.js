'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Ciudad extends Model {

  static associate(models) {
    this.belongsTo(models.Estado, {
      foreignKey: 'id_estado',
      as: 'ciudad_estado'
    }),

      this.hasMany(models.Persona, {
        foreignKey: 'id_ciudad',
        as: 'persona_ciudad'
      }),

      this.hasMany(models.Proveedor, {
        foreignKey: 'id_ciudad',
        as: 'proveedor_ciudad'
      })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Ciudad',
      tableName: 'ciudad',
      schema: process.env.DB_SCHEMA,
      paranoid: true,
      hooks: {
        beforeSave: (instance) => {
          Object.keys(instance.rawAttributes).forEach((field) => {
            // console.log(`Campo: ${field} , Tipo de dato: ${instance.rawAttributes[field].type}`)
            const fieldType = instance.rawAttributes[field].type;
            if (fieldType == 'VARCHAR(255)' || fieldType == 'TEXT') {
              instance[field] = instance[field].toUpperCase();
            }
          });
        }
      }
    }
  }
}

const CiudadSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  id_estado: {
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

module.exports = { Ciudad, CiudadSchema }


