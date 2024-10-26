const AppError = require('../../utils/AppError')
const { models } = require('../../config/sequelize')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const responseHandler = require('../../utils/responseHandler')


const generateToken = (payload) => {
  return jwt.sign(payload, process.env.JWT, {
    expiresIn: process.env.JWT_EXPIRES_IN
  })
}

class AuthController {

  static async signup(req, res, next) {
    try {
      const usuario = req.body.usuario
      const contrasena = req.body.contrasena
      const confirmarContrasena = req.body.confirmarContrasena
      const id_persona = req.body.id_persona

      const response = await models.Usuario.create({
        usuario: usuario,
        contrasena: contrasena,
        confirmarContrasena: confirmarContrasena,
        id_persona: id_persona
      })

      const result = await response.toJSON()
      delete result.id
      delete result.contrasena
      delete result.confirmarContrasena
      delete result.createdAt
      delete result.updatedAt
      delete result.deletedAt

      return responseHandler.created(res,result)

    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }
  }


  static async login(req, res, next) {
    try {
      const usuario = req.body.usuario
      const contrasena = req.body.contrasena

      if (!usuario || !contrasena) {
        return next(new AppError('Type /usuario/ (and/or) /contrasena/'))
      }
      let response = await models.Usuario.findOne({
        where: { usuario: usuario },
        attributes: {
          exclude: ['usuario', 'updatedAt', 'deletedAt']
        },
        include: [{
          model: models.Persona,
          as: 'persona_usuario',
          attributes: {
            exclude: ['createdat', 'updatedAt', 'deletedAt']
          }
        }]
      })

      if (!response || !(await bcrypt.compare(contrasena, response.contrasena))) {
        return next(new AppError('invalid credentials', 401))
      }

      const token = await generateToken({ id: response.id })
      response = response.toJSON()
      delete response.id
      delete response.contrasena

      return responseHandler.userLogged(res,response,token)
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }
  }

  static async authentication(req, res, next) {
    try {

      if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        var token = req.headers.authorization.split(' ')[1]
      }

      const TokenDetail = await jwt.verify(token, process.env.JWT)

      const response = await models.Usuario.findByPk(TokenDetail.id)

      if (!response) {
        return next(new AppError("The user doesn't exist", 404))
      }

      req.usuario = response
      next()
    } catch (error) {
      return next(new AppError(error.message, error.statusCode))
    }

  }

  static restrictTo(...UserTypes) {
    return async (req, res, next) => {
      if (!UserTypes.includes(req.usuario.id)) { // Rol
        return next(new AppError('You are not allowed to do this action', 403))
      }
      next()
    }
  }

}

module.exports = AuthController






