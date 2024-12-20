'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');
const AppError = require('../../../utils/AppError');


class Movimiento extends Model {

  static associate(models) {
    this.belongsTo(models.TipoDetalle, {
      foreignKey: 'tipo_movimiento',
      as: 'tipo_movimiento_detalle'
    }),
      this.hasOne(models.MovimientoDetalle, {
        foreignKey: 'id_movimiento',
        as: 'movimiento_detalle'
      }),
      this.belongsTo(models.Persona, {
        foreignKey: 'id_persona',
        as: 'movimiento_persona'
      })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Movimiento',
      tableName: 'movimiento',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const MovimientoSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  tipo_movimiento: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    References: {
      model: 'TipoDetalle',
      key: 'id'
    },
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
  descripcion: {
    allowNull: false,
    type: DataTypes.TEXT
  },
  fecha: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.DATE,
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
  id_persona: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.INTEGER,
    References: {
      model: 'Persona',
      key: 'id'
    },
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
  ganancia: {
    allowNull: DataTypes.DOUBLE,
    defaultValue: 0,
    notEmpty: true,
    type: DataTypes.DOUBLE,    
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

module.exports = { Movimiento, MovimientoSchema }