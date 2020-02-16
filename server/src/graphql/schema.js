const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]

    card(id: ID!): Card
    cards: [Card!]

    account(id: ID!): Account
    accounts: [Account!]

    payment(id: ID!): Payment
    payments: [Payment!]
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
    updateUser(
      id: String!
      name: String
      bio: String
      email: String
      avatar: String
      password: String
    ): User
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
