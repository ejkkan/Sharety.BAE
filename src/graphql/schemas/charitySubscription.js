export default `
  type CharitySubscription {
    _id: ID! 
    user: User!
    stripeId: String!
    chargeAt: String!
    updatedAt: String!
  }

  type Query {
    charitySubscription(_id: ID!): Subscription!
    charitySubscriptions: [Subscription!]
  }

  type Mutation {
    createCharitySubscription(subscription: CreateCharitySubscriptionInput): CharitySubscription!
  }

  input CreateCharitySubscriptionInput {
     user: ID!
     stripeId: String!
     chargeAt: String!
  }
`;
