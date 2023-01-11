// Importing express
const express = require('express')

const routes = require('./routes') // Carrega o index.js

// Starting express
const app = express()
app.use(express.json())
app.use(routes)

// Route express
const PORT = 3333
app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
