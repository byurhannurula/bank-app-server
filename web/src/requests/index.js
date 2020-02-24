import gql from 'graphql-tag'

export const getUser = gql`
  query {
    me {
      id
      firstName
      lastName
      ssn
      email
      avatar
      address
      accounts {
        id
        IBAN
        balance
        accountType
        currency
      }
      payments {
        id
        IBAN_sender
        IBAN_beneficiary
        currency
        reason
        value
        status
        updatedAt
      }
    }
  }
`

export const getAccounts = gql`
  query {
    me {
      id
      IBAN
      balance
      accountType
      currency
    }
  }
`

export const getPayments = gql`
  query {
    payments {
      id
      IBAN_sender
      IBAN_beneficiary
      currency
      reason
      value
      status
      updatedAt
    }
  }
`

export const registerMutation = gql`
  mutation registerMutation(
    $firstName: String!
    $lastName: String!
    $ssn: String!
    $email: String!
    $password: String!
  ) {
    register(
      firstName: $firstName
      lastName: $lastName
      ssn: $ssn
      email: $email
      password: $password
    ) {
      id
      firstName
      lastName
      ssn
      email
      avatar
      address
    }
  }
`

export const loginMutation = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      firstName
      lastName
      ssn
      email
      avatar
      address
    }
  }
`

export const logoutMutation = gql`
  mutation {
    logOut
  }
`
