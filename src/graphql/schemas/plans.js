export default `
  type Plan {
    _id: ID!
    name: String!
    amount: Int!
    stripeId: String!
    updatedAt: String!
  }
  
  type Query {
    plan(_id: ID!): Subscription!
    plans: [Subscription!]
  }

  type Mutation {
    createPlan(plan: CreatePlanInput): Plan!
  }

  input CreatePlanInput {
    name: String
    amount: Int
    stripeId: String
  }

`;
