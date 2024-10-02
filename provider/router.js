const AuthController = require('../db/controllers/AuthController')
const CategoriaController = require('../db/controllers/CategoriaController')

const router = require('express').Router()


const routes = [
  {
    path: '/auth/signup',
    method: 'post',
    handler: AuthController.signup
  },
  {
    path: '/auth/login',
    method: 'post',
    handler: AuthController.login
  },
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
]


routes.forEach((route) => {
  router.route(route.path)[route.method](route.handler)
})



module.exports = router