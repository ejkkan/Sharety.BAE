export default `
  type CampaignSubscription {
    _id: ID! 
    user: User!
    stripeId: String!
    chargeAt: String!
    updatedAt: String!
  }

  type Query {
    campaignSubscription(_id: ID!): Subscription!
    campaignSubscription: [Subscription!]
  }

  type Mutation {
    createCampaignSubscription(subscription: CreateCampaignSubscriptionInput): CampaignSubscription!
  }

  input CreateCampaignSubscriptionInput {
     user: ID!
     stripeId: String!
     chargeAt: String!
  }
`;
