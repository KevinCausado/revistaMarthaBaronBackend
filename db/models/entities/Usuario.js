'use strict';
const {
  Model,
  DataTypes
} = require('sequelize');

class Usuario extends Model {

  static associate(models) {
    //  this.belongsTo(models.Persona,{
    //   foreignKey:'id_tipo',
    //   as:'tipo_detalle'
    //  })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuario',
      schema: process.env.DB_SCHEMA,
      paranoid: true
    }
  }
}

const UsuarioSchema = {

  id: {
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
    type: DataTypes.INTEGER
  },
  usuario: {
    type: DataTypes.STRING
  },
  contrasena: {
    type: DataTypes.STRING
  },
  // id_persona: {
  //   type: DataTypes.INTEGER
  // },
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

module.exports = { Usuario, UsuarioSchema }


