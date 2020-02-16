const { ApolloServer } = require('apollo-server-express')
const { createServer } = require('http')

const { app } = require('./rest')
const typeDefs = require('../schema')

const dev = process.env.NODE_ENV === 'development'

const resolvers = {
  Query: {
    user: (parent, args, ctx, info) => {},
  },
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: !dev
    ? false
    : {
        settings: {
          'request.credentials': 'include',
        },
      },
  context: ({ req, res }) => ({ req, res }),
})

server.applyMiddleware({ app, cors: false })

const httpServer = createServer(app)

exports.httpServer = httpServer
