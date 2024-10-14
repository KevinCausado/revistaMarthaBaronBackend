'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Proveedor extends Model {

  static associate(models) {
    this.hasMany(models.Producto, {
      foreignKey: 'id_proveedor',
      as: 'producto_proveedor'
    }),
      this.belongsTo(models.Ciudad, {
        foreignKey: 'id_ciudad',
        as: 'proveedor_ciudad'
      }),
      this.hasMany(models.Movimiento, {
        foreignKey: 'id_proveedor',
        as: 'movimiento_proveedor'
      })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Proveedor',
      tableName: 'proveedor',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const ProveedorSchema = {

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
  tipo_servicio: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.ENUM('VIRTUAL','PRESENCIAL','AMBAS'),
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
  nombre: {
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
  direccion: {
    allowNull: false,
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
  email: {
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
  telefono: {
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
  id_ciudad: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    References: {
      model: 'Ciudad',
      key: 'id'
    },
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

module.exports = { Proveedor, ProveedorSchema }


