export default {
  campaigns: async (parent, args, { collections }) => {
    try {
      const campaigns = await collections.campaigns.find();
      return campaigns.toArray();
    } catch (e) {
      throw new Error("Failed to fetch Charity!");
    }
  },
  campaign: async (parent, { _id }, context, info) => {
    try {
      return await context.collections.campaigns.findOne({
        _id: context.ObjectID(_id)
      });
    } catch (e) {
      throw new Error("Failed to fetch Charities!!!");
    }
  }
};
