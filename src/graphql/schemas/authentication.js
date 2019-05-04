export default `
type Mutation {
  signin(email: String!, password: String!): AuthPayload!
  signup(user: SignupInput): AuthPayload!
}

type AuthPayload {
  token: String!
  user: User!
}

input SignupInput {
  email: String!
  password: String!
  username: String!
}
`;
