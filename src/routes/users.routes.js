// Imports
const { Router } = require('express')

const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

// Instanciando na memória
const usersController = new UsersController()

const usersRoutes = Router()
// identifica o endereço e redireciona para o controller correto.
usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)

module.exports = usersRoutes
