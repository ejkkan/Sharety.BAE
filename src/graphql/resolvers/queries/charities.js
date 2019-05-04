export default {
  charities: async (parent, args, { collections }) => {
    try {
      const users = await collections.charities.find();
      return users.toArray();
    } catch (e) {
      throw new Error("Failed to fetch Charity!");
    }
  },
  charity: async (parent, { _id }, context, info) => {
    try {
      return await context.collections.charities.findOne({
        _id: context.ObjectID(_id)
      });
    } catch (e) {
      throw new Error("Failed to fetch Charities!!!");
    }
  }
};
