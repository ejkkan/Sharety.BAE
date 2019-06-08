export default {
  payments: async (parent, args, { collections }) => {
    try {
      const campaigns = await collections.payments.find();
      return campaigns.toArray();
    } catch (e) {
      throw new Error("Failed to fetch Charity!");
    }
  },
  payment: async (parent, { _id }, context, info) => {
    try {
      return await context.collections.payments.findOne({
        _id: context.ObjectID(_id)
      });
    } catch (e) {
      throw new Error("Failed to fetch Charities!!!");
    }
  }
};
