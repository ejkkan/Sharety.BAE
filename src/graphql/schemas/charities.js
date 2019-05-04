export default `
  type Charity {
    _id: ID!
    title: String!
    description: String!
    campaigns: [Campaign!]
    users: [User!]!
  }

  type Query {
    charity(_id: ID!): Charity!
    charities: [Charity!]
  }

  type Mutation {
    createCharity(charity: CharityInput): Charity!
    #affiliateCharityToUser(user: ID!, charity: ID!): Charity!
  }

  input CharityInput {
    title: String!
    description: String!
    user: ID!
  }
`;
