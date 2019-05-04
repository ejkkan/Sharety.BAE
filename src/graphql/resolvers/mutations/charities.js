export default {
  createCharity: async (
    parent,
    { charity },
    { collections, ObjectID },
    info
  ) => {
    const user = await collections.users.findOne({
      _id: ObjectID(charity.user)
    });
    if (!user) throw new Error("Could not find that user");
    let newCharity = {
      title: charity.title,
      description: charity.description,
      users: [charity.user]
    };
    const res = await collections.charities.insertOne(newCharity);
    return newCharity;
  },
  deleteCharity: async (parent, { _id }, { collections, ObjectID, pubSub }) => {
    try {
      let response = await collections.charities.deleteOne({
        _id: ObjectID(_id)
      });
      if (response.deletedCount !== 1) {
        throw new Error("error.charity_not_found");
      }
      return "Successful";
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
