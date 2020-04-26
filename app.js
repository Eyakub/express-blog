const express = require('express')

const app = express()

app.get('/', (req, res) => {
  res.json({
    message: 'Hello from Project structure'
  })
})

const PORT = process.env.PORT || 7777
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`)
})