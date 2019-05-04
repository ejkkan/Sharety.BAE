export default `
type User {
  _id: String!
  email: String!
  username:String!
  posts: [String!]!
  permissions: [Permission!]
  charities: [Charity]
}

type Query {
  users: [User!]!
  user(_id: ID!): User!
  getCharitiesRelatedToUser(_id: ID!): [Charity]
}

type Mutation {
  createUser(user: CreateUserInput): User!
  updateUser(_id: ID!, user: UpdateUserInput): User!
  deleteUser(_id: ID!): String
}

input CreateUserInput {
  email: String!
  password: String!
  username: String!
  permissions: [Permission!]!
}

input UpdateUserInput {
  email: String
  username: String
  permissions: [Permission!]
}

`;
