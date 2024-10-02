const AuthController = require('../db/controllers/AuthController')
const CategoriaController = require('../db/controllers/CategoriaController')
const PaisController = require('../db/controllers/PaisController')
const EstadoController = require('../db/controllers/EstadoController')

const router = require('express').Router()


const routes = [
  {
    //Auth    
    path: '/auth/signup',
    method: 'post',
    handler: AuthController.signup
  },
  {
    path: '/auth/login',
    method: 'post',
    handler: AuthController.login
  },

  //Categoria
  {
    path: '/categoria/',
    method: 'get',
    handler: CategoriaController.getAll
  },
  {
    path: '/categoria/:id',
    method: 'get',
    handler: CategoriaController.getById
  },

  //Pais
  {
    path: '/pais/',
    method: 'post',
    handler: PaisController.create
  },
  {
    path: '/pais/',
    method: 'get',
    handler: PaisController.getAll
  },

  //Estado
  {
    path: '/estado/',
    method: 'post',
    handler: EstadoController.create
  },
]


routes.forEach((route) => {
  router.route(route.path)[route.method](route.handler)
})



module.exports = router