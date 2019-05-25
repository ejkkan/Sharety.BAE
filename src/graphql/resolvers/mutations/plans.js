export default {
  createPlan: async (
    parent,
    { plan },
    { collections, ObjectID, request },
    info
  ) => {
    try {
      if (!plan?.stripeId) throw new Error("no stripe account");
      if (!plan?.amount) throw new Error("no stripe amount");
      if (!plan?.amount) throw new Error("cant find payment plan");
      let newPlan = {
        ...plan,
        updatedAt: Date.now()
      };
      await collections.plans.insertOne(newPlan);
      return newPlan;
    } catch (error) {
      throw new Error(error);
    }
  }
};
