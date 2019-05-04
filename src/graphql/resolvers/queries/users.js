export default {
  users: async (parent, args, { collections }) => {
    try {
      const users = await collections.users.find();
      return users.toArray();
    } catch (e) {
      console.log(e);
      throw new Error("Cannot fetch User!!!");
    }
  },
  user: async (parent, { _id }, context, info) => {
    try {
      return await context.collections.users.findOne({
        _id: context.ObjectID(_id)
      });
    } catch (e) {
      console.log(e);
      throw new Error("Cannot fetch User!!!");
    }
  },
  getCharitiesRelatedToUser: async (parent, args, { collections, request }) => {
    try {
      const users = await collections.charities.find({
        users: [args._id]
      });
      return users.toArray();
    } catch (e) {
      throw new Error("Failed to fetch Charity!");
    }
  }
};
