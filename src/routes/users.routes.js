// Imports
const { Router } = require('express')
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()
// Instanciando na memória 
const usersController = new UsersController() 

// identifica o endereço e direciona para o controller correto.
usersRoutes.post('/', usersController.create) 
usersRoutes.put('/:id', usersController.update)

module.exports = usersRoutes
