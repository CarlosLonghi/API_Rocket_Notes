const AppError = require('../utils/AppError')

class UsersController {
  /*Métodos do Controller:
   *index - GET para listar vários registros.
   *show - GET para exibir um registro especifico.
   *create - POST para criar um registro.
   *update - PUT para atualizar um registro.
   *delete - DELETE para remover um registro.
   */
  create(request, response) {
    const { name, email, password } = request.body

    if (!name) {
      throw new AppError('Nome é obrigatório!')
    }

    //HTTP Status Code 201:Created
    response.status(201).json({ name, email, password })
  }
}

module.exports = UsersController
