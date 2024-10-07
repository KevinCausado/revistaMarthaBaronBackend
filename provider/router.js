const AuthController = require('../db/controllers/AuthController')
const PaisController = require('../db/controllers/PaisController')
const EstadoController = require('../db/controllers/EstadoController')
const CiudadController = require('../db/controllers/CiudadController')
const CategoriaController = require('../db/controllers/CategoriaController')

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
  {
    path: '/estado/',
    method: 'get',
    handler: EstadoController.getAll,
    protected: true,
  },

  //Ciudad
  {
    path: '/ciudad/',
    method: 'post',
    handler: CiudadController.create,
    protected: true,
  },
  {
    path: '/ciudad/',
    method: 'get',
    handler: CiudadController.getAll,
    protected: true,
  },

  //Categoria
  {
    path: '/categoria/',
    method: 'post',
    handler: CategoriaController.create,
    protected: true,
  },
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
  {
    path: '/categoria/:id',
    method: 'patch',
    handler: CategoriaController.Update,
    protected: true,
  },
  {
    path: '/categoria/:id',
    method: 'delete',
    handler: CategoriaController.Delete,
    protected: true,
  },
]

routes.forEach((route) => {

  if (route.protected) {
   return router.route(route.path)[route.method](
      AuthController.authentication, AuthController.restrictTo(1),
      route?.handler)
  }
  return router.route(route.path)[route.method](route.handler)

})



module.exports = router