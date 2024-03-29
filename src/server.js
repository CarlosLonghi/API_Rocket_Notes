// Imports
require('express-async-errors')
require('dotenv/config')

const migrationsRun = require('./database/sqlite/migrations')
const AppError = require('./utils/AppError')
const uploadConfig = require('./configs/upload')

const cors = require('cors')
const express = require('express')
const routes = require('./routes')

migrationsRun()

const app = express()
app.use(cors())
app.use(express.json())
app.use('/files', express.static(uploadConfig.UPLOADS_FOLDER))

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
const PORT = process.env.PORT || 3333
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
