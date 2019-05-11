export default {
  subscriptionItems: async (parent, args, { collections }) => {
    try {
      const subscriptionItems = await collections.subscriptionItems.find();
      return subscriptionItems.toArray();
    } catch (e) {
      throw new Error("Failed to fetch Subscriptions Items!");
    }
  },
  subscriptionItem: async (parent, { _id }, context, info) => {
    try {
      return await context.collections.subscriptionItems.findOne({
        _id: context.ObjectID(_id)
      });
    } catch (e) {
      throw new Error("Failed to fetch Subscription Items!!!");
    }
  }
};
