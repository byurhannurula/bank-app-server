const { ApolloServer } = require('apollo-server-express')
const { createServer } = require('http')

const { app } = require('./rest')
const typeDefs = require('../graphql/schema')
const resolvers = require('../graphql/resolvers')

const { models } = require('../models')

const dev = process.env.NODE_ENV === 'development'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
  context: ({ req, res }) => ({ req, res, models }),
})

server.applyMiddleware({ app, cors: false })

const httpServer = createServer(app)

exports.httpServer = httpServer
