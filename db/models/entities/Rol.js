'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Rol extends Model {

  static associate(models) {
  
    this.belongsToMany(models.Usuario, {  // Business Model at moment: 1 admin
      through: {
        model: 'usuario_rol',
        // unique: false
      },
      foreignKey: 'id_rol',
      otherKey: 'id_usuario',
      as: 'usuario_usuario_rol',
      // indexes: {
      //   unique: true,
      //   fields: ['id_usuario', 'id_rol']
      // }
    }),

    this.belongsToMany(models.Opcion, {  
      through: {
        model: 'opcion_rol',
        unique: false
      },
      foreignKey: 'id_rol',
      otherKey: 'id_opcion',
      as: 'rol_opcion_rol',
      indexes: {
        unique: true,
        fields: ['id_opcion', 'id_rol']
      }
    })    
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Rol',
      tableName: 'rol',
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

const RolSchema = {
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
  isAdmin: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.BOOLEAN,
  },
  isSuperAdmin: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.BOOLEAN,
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

module.exports = { Rol, RolSchema }




