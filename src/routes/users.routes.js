const { Router } = require('express')
const UsersController = require("../controllers/UsersController")

const usersRoutes = Router()
const usersController = new UsersController() // instanciando na memória 

// identifica o endereço e direciona para o controller correto.
usersRoutes.post('/', usersController.create) 

module.exports = usersRoutes
