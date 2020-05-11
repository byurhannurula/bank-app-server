require('dotenv').config()

const { dbConnection } = require('./config/db')
const { httpServer } = require('./config/graphql')
const { app } = require('./config/rest')
const routes = require('./routes')

const restPort = process.env.REST_PORT || 1000
const graphqlPort = process.env.GRAPHQL_PORT || 2000

const initServer = async () => {
  console.clear()

  await dbConnection()

  app.use('/', routes)

  app.listen(restPort, () => {
    console.log(`— Rest API: http://localhost:${restPort}`)
  })
  httpServer.listen(graphqlPort, () => {
    console.log(`— Graphql API: http://localhost:${graphqlPort}/graphql`)
  })
}

initServer()
