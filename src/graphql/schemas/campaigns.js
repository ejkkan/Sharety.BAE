export default `
  type Campaign {
    _id: ID!
    title: String!
    description: String!
    charity: ID!
  }

  type Query {
    campaign(_id: ID!): Campaign!
    campaigns: [Campaign!]
  }

  type Mutation {
    createCampaign(campaign: CampaignInput): Campaign!
  }

  input CampaignInput {
    title: String!
    description: String!
    charity: ID!
  }
`;
