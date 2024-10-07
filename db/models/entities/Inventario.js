'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Inventario extends Model {
  
  static associate(models) {
    this.belongsTo(models.Producto,{
      foreignKey:'id_producto',
      as:'inventario_producto'
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Inventario',
      tableName: 'inventario',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const InventarioSchema = {
  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  id_producto: {
    type: DataTypes.INTEGER
  },
  cantidad: {
    type: DataTypes.INTEGER
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

module.exports = {Inventario,InventarioSchema}
