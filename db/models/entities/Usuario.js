'use strict';
const {
  Model,
  DataTypes,
} = require('sequelize');
const AppError = require('../../../utils/AppError');
const bcrypt = require('bcrypt')

class Usuario extends Model {

  static associate(models) {
    this.belongsTo(models.Persona, {
      foreignKey: 'id_persona',
      as: 'persona_usuario',
      allowNull:true
    })

    this.belongsToMany(models.Rol, {
      through: {
        model: 'usuario_rol',
        unique: false
      },
      foreignKey: 'id_usuario',
      otherKey: 'id_rol',
      as: 'rol_usuario_rol',
      indexes: {
        unique: true,
        fields: ['id_usuario', 'id_rol']
      }
    })
  }

  static config(sequelize) {
    return {
      sequelize,
      modelName: 'Usuario',
      tableName: 'usuario',
      schema: process.env.DB_SCHEMA,
      paranoid: true,
      hooks: {
        beforeSave: async (usuario) => {
          if (usuario.contrasena !== usuario.confirmarContrasena) {
            throw new AppError("Passwords don't match", 400)
          }
          usuario.contrasena = await bcrypt.hashSync(usuario.contrasena, 10)
        }
      }
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
    allowNull: false,
    notEmpty: true,
    type: DataTypes.STRING,

  },
  contrasena: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.STRING,

  },
  confirmarContrasena: {
    allowNull: false,
    notEmpty: true,
    type: DataTypes.VIRTUAL,
  },
  id_persona: {
    allowNull: true,    
    type: DataTypes.INTEGER,
    References: {
      model: 'Persona',
      key: 'id'
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


module.exports = { Usuario, UsuarioSchema }


