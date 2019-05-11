export default {
  plans: async (parent, args, { collections }) => {
    try {
      const plans = await collections.plans.find();
      return plans.toArray();
    } catch (e) {
      throw new Error("Failed to fetch Plans!");
    }
  },
  plans: async (parent, { _id }, context, info) => {
    try {
      return await context.collections.plans.findOne({
        _id: context.ObjectID(_id)
      });
    } catch (e) {
      throw new Error("Failed to fetch Plan!!!");
    }
  }
};
