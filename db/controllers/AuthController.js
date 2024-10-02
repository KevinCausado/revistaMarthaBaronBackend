class AuthController {

  static signup = (req, res, next) => {
    res.status(200).json({
      Estado: 'Success',
      Mensaje: 'Usuario creado con exito'
    })
  }


  static login = (req, res, next) => {
    res.status(200).json({
      Estado: 'Success',
      Mensaje: 'Inicio de sesion exitoso'
    })
  }
}


module.exports = AuthController






