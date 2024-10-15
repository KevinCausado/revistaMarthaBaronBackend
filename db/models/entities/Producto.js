'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');

class Producto extends Model {

  static associate(models) {
    this.belongsTo(models.Categoria, {
      foreignKey: 'id_categoria',
      as: 'producto_categoria'
    }),
      this.belongsTo(models.Proveedor, {
        foreignKey: 'id_proveedor',
        as: 'producto_proveedor'
      }),
      this.hasMany(models.MovimientoDetalle, {
        foreignKey: 'id_producto',
        as: 'movimiento_detalle_producto'
      }),
      this.hasMany(models.Inventario, {
        foreignKey: 'id_producto',
        as: 'inventario_producto'
      })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Producto',
      tableName: 'producto',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const ProductoSchema = {

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
  id_categoria: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    References: {
      model: 'Categoria',
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
  id_proveedor: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    References: {
      model: 'Proveedor',
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
  precio_entrada: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.DOUBLE,
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new AppError(`El campo "${fieldName}" no puede estar vacío`,400);
          }
          if (value < 0 ) {
            throw new AppError(`Campo "${fieldName}": No puedes colocar valores negativos.`,400);
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

module.exports = { Producto, ProductoSchema }


