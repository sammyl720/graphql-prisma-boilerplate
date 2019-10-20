import { gql } from 'apollo-boost'

// user operations
const createUser = gql`
  mutation($data: CreateUserInput!) {
    createUser(data: $data) {
      token
      user {
        id
        name
        email
      }
    }
  }
`
const getUsers = gql`
  query {
    users {
      id
      name
      email
    }
  }
`
const login = gql`
  mutation($data: LoginUserInput!) {
    loginUser(data: $data) {
      token
    }
  }
`
const getProfile = gql`
  query {
    me {
      id
      name
      email
    }
  }
`

export { getProfile, getUsers, login, createUser }
