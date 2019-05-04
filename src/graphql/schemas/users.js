export default `
type User {
  _id: String!
  email: String!
  username:String!
  posts: [String!]!
}

type Query {
  users: [User!]!
  user(_id: ID!): User!
}

type Mutation {
  createUser(user: CreateUserInput): User!
  signin(email: String!, password: String!): SigninPayload!
  #signup(email: String!, password: String!): String!
}

input CreateUserInput {
  email: String!
  password: String!
  username: String!
}

type SigninPayload {
  token: String!
  user: User!
}`;
