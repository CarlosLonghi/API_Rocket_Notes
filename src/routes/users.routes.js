// Imports
const { Router } = require('express')
const multer = require('multer')
const uploadConfig = require('../configs/upload')

const UsersController = require('../controllers/UsersController')
const ensureAuthenticated = require('../middlewares/ensureAuthenticated')

const usersRoutes = Router()
const upload = multer(uploadConfig.MULTER)

// Instanciando na memória
const usersController = new UsersController()

// identifica o endereço e redireciona para o controller correto.
usersRoutes.post('/', usersController.create)
usersRoutes.put('/', ensureAuthenticated, usersController.update)
usersRoutes.patch(
  '/avatar',
  ensureAuthenticated,
  upload.single('avatar'),
  (request, response) => {
    console.log(request.file.filename)
    response.json()
  }
)

module.exports = usersRoutes
