const express = require('express')
const cors = require('cors')

const authRoute = require('./routes/auth')

const app = express()

require('dotenv').config()

const PORT = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())
// app.use(express.urlencoded())

app.use('/auth', authRoute);

app.get('/', (req, res) => {
  res.send('Hello world')
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
