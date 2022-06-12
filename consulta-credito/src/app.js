const express = require('express')

const app = express()

app.get('/', async (req, res) => {
  res.status(200).send('APP no ar. Glória a Deus!')
})

module.exports = app
