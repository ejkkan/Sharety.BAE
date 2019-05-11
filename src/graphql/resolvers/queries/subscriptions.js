export default {
  subscriptions: async (parent, args, { collections }) => {
    try {
      const subscriptions = await collections.subscriptions.find();
      return subscriptions.toArray();
    } catch (e) {
      throw new Error("Failed to fetch Subscriptions!");
    }
  },
  subscription: async (parent, { _id }, context, info) => {
    try {
      return await context.collections.subscriptions.findOne({
        _id: context.ObjectID(_id)
      });
    } catch (e) {
      throw new Error("Failed to fetch Subscription!!!");
    }
  }
};
