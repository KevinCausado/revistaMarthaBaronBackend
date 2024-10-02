class CategoriaController {

  static getAll(req, res, next) {
    res.status(200).json({
      Estado: 'Success',
      Mensaje: 'Registros obtenidos'
    })
  }


  static getById(req, res, next) {
    res.status(200).json({
      Estado: 'Success',
      Mensaje: 'Registo encontrado por id'
    })
  }
}


module.exports = CategoriaController






