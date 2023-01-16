const { hash, compare } = require('bcryptjs')
const AppError = require('../utils/AppError')
const sqliteConnection = require('../database/sqlite')

class UsersController {
  /*Métodos do Controller:
   *index - GET para listar vários registros.
   *show - GET para exibir um registro especifico.
   *create - POST para criar um registro.
   *update - PUT para atualizar um registro.
   *delete - DELETE para remover um registro.
   */
  async create(request, response) {
    const { name, email, password } = request.body

    const database = await sqliteConnection()
    const checkUserExist = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (checkUserExist) {
      throw new AppError('Este e-mail já está em uso!')
    }

    const hashedPassword = await hash(password, 8)

    await database.run(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, hashedPassword]
    )
    //HTTP Status Code 201:Created
    return response.status(201).json()
  }

  async update(request, response) {
    const { name, email, password, old_password } = request.body
    const { id } = request.params

    const database = await sqliteConnection()
    const user = await database.get('SELECT * FROM users WHERE id = (?)', [id])

    if (!user) {
      throw new AppError('Usuário não encontrado!')
    }

    const userWithUpdatedEmail = await database.get(
      'SELECT * FROM users WHERE email = (?)',
      [email]
    )

    if (userWithUpdatedEmail && userWithUpdatedEmail.id !== user.id) {
      throw new AppError('Este email já está em uso!')
    }

    //Nullish coalescing operator (??)
    // Verifica se existe um conteúdo (name), se for nulo (??) usa o conteúdo existente.
    user.name = name ?? user.name
    user.email = email ?? user.email

    if (!old_password && password) {
      throw new AppError(
        'Você precisa informar sua senha antiga para definir uma nova senha!'
      )
    }

    if (old_password && password) {
      const checkOldPassword = await compare(old_password, user.password)
      if (!checkOldPassword) {
        throw new AppError('A senha antiga não está correta!')
      }

      user.password = await hash(password, 8)
    }

    await database.run(
      `
      UPDATE users SET
      name = ?,
      email = ?,
      password = ?,
      updated_at = DATETIME('now')
      WHERE id = ?`,
      [user.name, user.email, user.password, id]
    )
    return response.status(200).json()
  }
}

module.exports = UsersController
