require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./config/db')

const port = process.env.NODE_ENV || 9191

const initServer = async () => {
  await dbConnection()

  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(cors())

  app.get('/', (req, res) => {
    res.send('Hello world!')
  })

  app.listen(port, () => {
    console.log(`— Server: http://127.0.0.1:${port}`)
  })
}

initServer()
