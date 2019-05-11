export default `
  type User {
    _id: String!
    email: String!
    username:String!
    permissions: [Permission!]
    charities: [Charity]

    phone: String
    profileImage: String
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
    affiliateUserToCharity(user: ID!, charity: ID!): AffiliateCharityUserPayload!
  }

  input CreateUserInput {
    email: String!
    password: String!
    username: String!
    phone: String
    profileImage: String
    permissions: [Permission!]!
  }

  input UpdateUserInput {
    email: String
    username: String
    phone: String
    charities: [ID!]
    profileImage: String
    permissions: [Permission!]
  }
  
  type AffiliateCharityUserPayload {
    charity: Charity!
    user: User!
  }
`;
