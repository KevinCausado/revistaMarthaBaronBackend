const AuthController = require('../db/controllers/AuthController')
const CategoriaController = require('../db/controllers/CategoriaController')

const router = require('express').Router()


const routes = [
  {
    path: '/signup',
    method: 'post',
    handler: AuthController.signup
  },
  {
    path: '/login',
    method: 'post',
    handler: AuthController.login
  },
  {
    path: '/',
    method: 'get',
    handler: CategoriaController.getAll
  },
  {
    path: '/:id',
    method: 'get',
    handler: CategoriaController.getById
  },
]


routes.forEach((route) => {
  router.route(route.path)[route.method](route.handler)
})



module.exports = router