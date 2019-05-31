export default `
  type Charity {
    _id: ID!
    title: String!
    description: String!
    campaigns: [Campaign!]
    managers: [User!]!
    image: String!
    largeImage: String!
    images: [String]!
    largeImages: [String]!
  }

  type Query {
    charity(_id: ID!): Charity!
    charities: [Charity!]
    getUsersRelatedToCharity(_id: ID!): [Charity]
  }

  type Mutation {
    createCharity(charity: CharityInput): Charity!
    deleteCharity(_id: ID!): String
    affiliateCharityToUser(manager: ID!, charity: ID!): AffiliateChaityUserPayload!
  }

  input CharityInput {
    title: String!
    description: String!
    manager: ID!
  }

  type AffiliateChaityUserPayload {
    charity: Charity!
    manager: User!
  }
`;
