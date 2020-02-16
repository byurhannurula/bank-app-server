require('dotenv').config({ path: `.env.${process.env.NODE_ENV}` })

const { dbConnection } = require('./config/db')
const { httpServer } = require('./config/graphql')
const { app } = require('./config/rest')
const routes = require('./routes')

const port1 = process.env.PORT || 4001
const port2 = process.env.PORT || 4002

const initServer = async () => {
  console.clear()

  await dbConnection()

  app.use('/', routes)

  app.listen(port1, () => {
    console.log(`— Rest API is running: http://localhost:${port1}`)
  })
  httpServer.listen(port2, () => {
    console.log(`— Graphql API is running: http://localhost:${port2}/graphql`)
  })
}

initServer()
