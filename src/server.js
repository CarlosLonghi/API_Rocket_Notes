// Importing express
const express = require('express')
// Starting express
const app = express()

// (Route Params ':/params') são utilizados para passar dados simples. como: id, name, etc...
app.get('/message/:id_product/:name_product', (request, response) => {
  // Desestruturando params:
  const { id_product, name_product } = request.params
  response.send(`
  Id do produto: ${id_product}. <br>
  Nome do produto: ${name_product}.
  `)
})

// (Query Params)Exemple:'users?page=5&category=10'

app.get('/users', (request, response) => {
  const { page, category } = request.query
  response.send(`
  Número da Página: ${page}. <br>
  Categoria do produto: ${category}.
  `)
})

// Route express
const PORT = 3333

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
