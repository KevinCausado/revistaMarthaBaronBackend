const AuthController = require('../db/controllers/AuthController')
const PaisController = require('../db/controllers/PaisController')
const EstadoController = require('../db/controllers/EstadoController')
const CiudadController = require('../db/controllers/CiudadController')
const CategoriaController = require('../db/controllers/CategoriaController')
const TipoController = require('../db/controllers/TipoController')
const TipoDetalleController = require('../db/controllers/TipoDetalleController')
const PersonaController = require('../db/controllers/PersonaController')


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
  {
    path: '/pais/:id',
    method: 'get',
    handler: PaisController.getById,
    protected: true,
  },
  {
    path: '/pais/:id',
    method: 'patch',
    handler: PaisController.Update,
    protected: true,
  },
  {
    path: '/pais/:id',
    method: 'delete',
    handler: PaisController.Delete,
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
  {
    path: '/estado/:id',
    method: 'get',
    handler: EstadoController.getById,
    protected: true,
  },
  {
    path: '/estado/:id',
    method: 'patch',
    handler: EstadoController.Update,
    protected: true,
  },
  {
    path: '/estado/:id',
    method: 'delete',
    handler: EstadoController.Delete,
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
  {
    path: '/ciudad/:id',
    method: 'get',
    handler: CiudadController.getById,
    protected: true,
  },
  {
    path: '/ciudad/:id',
    method: 'patch',
    handler: CiudadController.Update,
    protected: true,
  },
  {
    path: '/ciudad/:id',
    method: 'delete',
    handler: CiudadController.Delete,
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

  //Tipo
  {
    path: '/tipo/',
    method: 'post',
    handler: TipoController.create,
    protected: true,
  },
  {
    path: '/tipo/',
    method: 'get',
    handler: TipoController.getAll,
    protected: true,
  },
  {
    path: '/tipo/:id',
    method: 'get',
    handler: TipoController.getById,
    protected: true,
  },
  {
    path: '/tipo/:id',
    method: 'patch',
    handler: TipoController.Update,
    protected: true,
  },
  {
    path: '/tipo/:id',
    method: 'delete',
    handler: TipoController.Delete,
    protected: true,
  },

  //TipoDetalle
  {
    path: '/tipo-detalle/',
    method: 'post',
    handler: TipoDetalleController.create,
    protected: true,
  },
  {
    path: '/tipo-detalle/',
    method: 'get',
    handler: TipoDetalleController.getAll,
    protected: true,
  },
  {
    path: '/tipo-detalle/:id',
    method: 'get',
    handler: TipoDetalleController.getById,
    protected: true,
  },
  {
    path: '/tipo-detalle/:id',
    method: 'patch',
    handler: TipoDetalleController.Update,
    protected: true,
  },
  {
    path: '/tipo-detalle/:id',
    method: 'delete',
    handler: TipoDetalleController.Delete,
    protected: true,
  },

  //Persona
  {
    path: '/persona/',
    method: 'post',
    handler: PersonaController.create,
    protected: true,
  },
  {
    path: '/persona/',
    method: 'get',
    handler: PersonaController.getAll,
    protected: true,
  },
  {
    path: '/persona/:id',
    method: 'get',
    handler: PersonaController.getById,
    protected: true,
  },
  {
    path: '/persona/:id',
    method: 'patch',
    handler: PersonaController.Update,
    protected: true,
  },
  {
    path: '/persona/:id',
    method: 'delete',
    handler: PersonaController.Delete,
    protected: true,
  },
]

routes.forEach((route) => {

  if (route.protected) {
    return router.route(route.path)[route.method](
      // AuthController.authentication, AuthController.restrictTo(1),
      route?.handler)
  }
  return router.route(route.path)[route.method](route.handler)

})



module.exports = router