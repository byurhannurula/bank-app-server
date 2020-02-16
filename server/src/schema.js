const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    user: User
    users: [User]!

    card: Card
    cards: [Card]!

    account: Account
    accounts: [Account]!

    payment: Payment
    payments: [Payment]!
  }

  type Mutation {
    register(
      firstName: String!
      lastName: String!
      email: String!
      password: String!
    ): User
    login(email: String!, password: String!): User!
    logOut: Boolean
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    ssn: String!
    email: String!
    avatar: String
    createdAt: String!
    updatedAt: String!
  }

  type Account {
    id: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Payment {
    id: ID!
    createdAt: String!
    updatedAt: String!
  }

  type Card {
    id: ID!
    createdAt: String!
    updatedAt: String!
  }
`
