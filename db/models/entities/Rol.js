'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Rol extends Model {

  static associate(models) {
    this.belongsToMany(models.Usuario, {
      through: 'usuario_rol',
      foreignKey: 'id_rol',
      otherKey: 'id_usuario',
      as: 'usuario_usuario_rol',
      allowNull: true
    })

    this.belongsToMany(models.Opcion, {
      through: 'opcion_rol',
      foreignKey: 'id_rol',
      otherKey: 'id_opcion',
      as: 'rol_opcion_rol'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Rol',
      tableName: 'rol',
      schema: process.env.DB_SCHEMA,
      paranoid: true
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




