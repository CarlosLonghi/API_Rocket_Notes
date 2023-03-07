const { verify } = require('jsonwebtoken')
const AppError = require('../utils/AppError')
const authConfig = require('../configs/auth')

function ensureAuthenticated(request, response, next) {
  const authHeader = request.headers.authorization //GET token

  if (!authHeader) {
    throw new AppError('JWT Token não informado!', 401)
  }

  const [, token] = authHeader.split(' ') //Bearer xxxx(token)

  try {
    //sub(desestrutura o resultado da função): user_id(aliasSQL é um apelido para uma tabela ou uma coluna)
    const { sub: user_id } = verify(token, authConfig.jwt.secret)

    request.user = {
      id: Number(user_id)
    }
    return next()
  } catch {
    throw new AppError('JWT Token inválido!', 401)
  }
}

module.exports = ensureAuthenticated
