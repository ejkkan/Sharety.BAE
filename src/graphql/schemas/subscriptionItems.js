export default `
    type SubscriptionItem {
        _id: ID!
        charity: Charity!
        user: User!
        subscription: Subscription!
        #plan: Plan!
        amount: Int
        updatedAt: String!
    }

    type Query {
        subscriptionItem(_id: ID!): SubscriptionItem!
        subscriptionItems: [SubscriptionItem!]
    }

    type Mutation {
        createSubscriptionItem(subscriptionItem: CreateSubscriptionItemInput): SubscriptionItem!
    }

    input CreateSubscriptionItemInput {
        charity: ID!
        user: ID!
        subscription: ID!
        #plan: Plan
        amount: Int
    }
`;
