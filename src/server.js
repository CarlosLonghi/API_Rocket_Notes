// Importing express
const express = require('express')
// Starting express
const app = express()

// Params são utilizados para passar dados simples. como: id, name, etc...
app.get('/message/:id_product/:name_product', (request, response) => {
  // Desestruturando params:
  const { id_product, name_product } = request.params
  response.send(`
  Id do produto: ${id_product}. <br>
  Nome do produto: ${name_product}.
  `)
})

// Route express
const PORT = 3333

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
