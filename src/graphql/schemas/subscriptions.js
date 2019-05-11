export default `
  type Subscription {
    _id: ID! 
    user: User!
    stripeId: String!
    chargeAt: String!
    updatedAt: String!
  }

  type Query {
    subscription(_id: ID!): Subscription!
    subscriptions: [Subscription!]
  }

  type Mutation {
    createSubscription(subscription: CreateSubscriptionInput): Subscription!
  }

  input CreateSubscriptionInput {
     user: ID!
     stripeId: String!
     chargeAt: String!
  }
`;
