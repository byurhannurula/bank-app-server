const { gql } = require('apollo-server-express')

module.exports = gql`
  type Query {
    me: User
    user(id: ID!): User
    users: [User!]

    card(id: ID!): Card
    cards: [Card!]

    account(iban: String!): Account
    accounts: [Account!]

    payment(id: ID!): Payment
    searchPayment(query: String!): [Payment!]
    payments: [Payment!]
  }

  type Mutation {
    logOut: Boolean
    login(email: String!, password: String!): User!
    register(
      firstName: String!
      lastName: String!
      ssn: String!
      email: String!
      password: String!
    ): User!
    updateUser(
      id: ID!
      firstName: String
      lastName: String
      ssn: String
      email: String
      address: String
      phoneNumber: String
    ): Message!

    createAccount(owner: ID!, currency: String, accountType: String): Account!
    updateAccount(IBAN: String!, balance: Float): Account!

    makePayment(
      IBAN_sender: String!
      IBAN_beneficiary: String!
      value: Float!
      reason: String
    ): ResponseMessage!

    requestCard(
      IBAN: String!
      currency: String
      status: String
      type: String
    ): Message!
  }

  type User {
    id: ID!
    firstName: String!
    lastName: String!
    ssn: Int!
    email: String!
    avatar: String
    address: String
    phoneNumber: String
    accounts: [Account!]
    payments: [Payment!]
    cards: [Card!]
    createdAt: String!
    updatedAt: String!
  }

  type Account {
    id: ID!
    owner: User!
    IBAN: String!
    balance: Float
    cards: [Card!]
    status: String
    currency: String
    accountType: String
    createdAt: String!
    updatedAt: String!
  }

  type Payment {
    id: ID!
    IBAN_sender: String!
    IBAN_beneficiary: String!
    value: Float!
    currency: String!
    reason: String
    status: String
    createdAt: String!
    updatedAt: String!
  }

  type Card {
    id: ID!
    type: String!
    status: String!
    number: String!
    cvc: String!
    holder: User!
    account: Account!
    validUntil: String!
    createdAt: String!
    updatedAt: String!
  }

  type Message {
    message: String!
  }

  type ResponseMessage {
    code: String
    status: String
    message: String
  }
`
