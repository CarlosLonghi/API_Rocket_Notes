// Imports
const { Router } = require('express')
const UsersController = require("../controllers/UsersController")

// Instanciando na memória 
const usersController = new UsersController() 

const usersRoutes = Router()
// identifica o endereço e redireciona para o controller correto.
usersRoutes.post('/', usersController.create) 
usersRoutes.put('/:id', usersController.update)

module.exports = usersRoutes
