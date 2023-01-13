// Imports
require('express-async-errors')
const AppError = require('./utils/AppError')
const express = require('express')
// Importing index.js
const routes = require('./routes')

// Starting express
const app = express()

app.use(express.json())
app.use(routes)

app.use((error, request, response, next) => {
  // Verifica se é um erro do cliente
  if (error instanceof AppError) {
    return response.status(error.statusCode).json({
      status: 'error',
      message: error.message
    })
  }

  console.error(error)

  // Verifica se é um erro do servidor
  return response.status(500).json({
    status: 'error',
    message: 'Internal server error!'
  })
})

// Route express
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
