const express = require('express') // Importing express 
const app = express() // Starting express 
const PORT = 3333 // Route express

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`))
