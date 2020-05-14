const { ApolloServer } = require('apollo-server-express')
const { createServer } = require('http')

const { app } = require('./rest')
const typeDefs = require('../graphql/schema')
const resolvers = require('../graphql/resolvers')
const { redis } = require('./redis')

const { models } = require('../models')

const dev = process.env.NODE_ENV === 'development'

const server = new ApolloServer({
  typeDefs,
  resolvers,
  introspection: true,
  playground: {
    settings: {
      'request.credentials': 'include',
    },
  },
  context: ({ req, res }) => {
    return { req, res, models }
  },
})

server.applyMiddleware({ app, cors: false })

const httpServer = createServer(app)

exports.httpServer = httpServer
