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

export const registerMutation = gql`
  mutation {
    register(
      firstName: "Byurhan"
      lastName: "Beyzat"
      ssn: "1020304050"
      email: "b@b.com"
      password: "secretPass1"
    ) {
      id
      firstName
      lastName
      email
      ssn
      avatar
    }
  }
`
