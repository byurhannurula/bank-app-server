require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })
const bodyParser = require('body-parser')
const express = require('express')
const cors = require('cors')

const { dbConnection } = require('./config/db')
const routes = require('./routes')

const initServer = async () => {
  const port = process.env.PORT || 4000

  await dbConnection()

  const app = express()

  app.use(bodyParser.urlencoded({ extended: false }))
  app.use(bodyParser.json())

  app.use(cors())

  app.use('/', routes)

  app.listen(port, () => {
    console.log(`— Server: http://127.0.0.1:${port}`)
  })
}

initServer()
