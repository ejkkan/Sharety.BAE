export default `
  
  
  type Payment {
    _id: ID! 
    user: User!
    charity: Charity!
    chargedAt: String!
    amount: Int!
  }

  type Query {
    payment(_id: ID!): Payment!
    payments: [Payment!]
  }

  type Mutation {
    createPayment(payment: CreatePaymentInput): Payment!
  }

  input CreatePaymentInput {
     user: ID!
     charity: ID!
     chargedAt: String!
     amount: Int!
  }
`;
