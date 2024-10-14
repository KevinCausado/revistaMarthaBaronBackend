'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class TipoDetalle extends Model {

  static associate(models) {
    this.belongsTo(models.Tipo, {
      foreignKey: 'id_tipo',
      as: 'tipo_detalle'
    }),

      this.hasOne(models.Persona, {
        foreignKey: 'tipo_documento',
        as: 'persona_tipo_documento'
      }),

      this.hasOne(models.Movimiento, {
        foreignKey: 'tipo_movimiento',
        as: 'tipo_movimiento_detalle'
      })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'TipoDetalle',
      tableName: 'tipo_detalle',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const TipoDetalleSchema = {

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
            throw new Error(`El campo "${fieldName}" no puede estar vacío`);
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
            throw new Error(`El campo "${fieldName}" no puede estar vacío`);
          }
        }
      }
    }
  },
  id_tipo: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    References: {
      model: 'Tipo',
      key: 'id'
    },
    validate: {
      emptyField(value) {
        if (this.isnewRecord || value !== undefined) {
          const fieldName = Object.keys(this.rawAttributes).find(key => this.getDataValue(key) === value);
          if (value === '') {
            throw new Error(`El campo "${fieldName}" no puede estar vacío`);
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

module.exports = { TipoDetalle, TipoDetalleSchema }


