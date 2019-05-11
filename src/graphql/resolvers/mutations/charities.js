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
    const res2 = await collections.users.update(
      { _id: ObjectID(user._id) },
      { $push: { charities: newCharity._id } }
    );
    if (res2.result.nModified !== 1) {
      throw new Error("Failed to update user with new charity");
    }
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
  },
  affiliateCharityToUser: async (
    parent,
    { charity, user },
    { collections, ObjectID, pubSub }
  ) => {
    const u = await collections.users.findOne({
      _id: ObjectID(user)
    });
    const c = await collections.charities.findOne({
      _id: ObjectID(charity)
    });
    if (c?.users?.includes(user))
      throw new Error("Charity already affiliated to user");
    if (u?.charities?.includes(charity))
      throw new Error("User already affiliated to charity");

    await collections.charities.update(
      { _id: ObjectID(charity) },
      { $push: { users: user } }
    );
    await collections.users.update(
      { _id: ObjectID(user) },
      { $push: { charities: charity } }
    );
    return {
      user: u,
      charity: c
    };
  }
};
