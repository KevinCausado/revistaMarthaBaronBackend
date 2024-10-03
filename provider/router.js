const AuthController = require('../db/controllers/AuthController')
const CategoriaController = require('../db/controllers/CategoriaController')
const PaisController = require('../db/controllers/PaisController')
const EstadoController = require('../db/controllers/EstadoController')

const router = require('express').Router()





const routes = [
  //Auth
  {
    path: '/auth/login/',
    method: 'post',
    handler: AuthController.login,
    protected: false,
  },
  {

    path: '/auth/signup/',
    method: 'post',
    handler: AuthController.signup,
    protected: true,
  },

  //Categoria
  {
    path: '/categoria/',
    method: 'get',
    handler: CategoriaController.getAll,
    protected: true,
  },
  {
    path: '/categoria/:id',
    method: 'get',
    handler: CategoriaController.getById,
    protected: true,
  },

  //Pais
  {
    path: '/pais/',
    method: 'post',
    handler: PaisController.create,
    protected: true,
  },
  {
    path: '/pais/',
    method: 'get',
    handler: PaisController.getAll,
    protected: true,
  },

  //Estado
  {
    path: '/estado/',
    method: 'post',
    handler: EstadoController.create,
    protected: true,
  },
]

routes.forEach((route) => {

  if (route.protected) {
    router.route(route.path)[route.method](AuthController.authentication, AuthController.restrictTo(1), route.handler)
  }
  router.route(route.path)[route.method](route.handler)

})



module.exports = router