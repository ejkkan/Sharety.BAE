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
  }
};
