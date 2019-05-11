import bcrypt from "bcryptjs";
//import Transaction from "../../../utils/transaction";

export default {
  createUser: async (parent, { user }, { db, collections }, info) => {
    try {
      const password = await bcrypt.hash(user.password, 10);
      let newUser = {
        email: user.email,
        username: user.username,
        password: password,
        permissions: user.permissions
      };
      const res = await collections.users.insertOne(newUser);
      return newUser;
    } catch (error) {
      throw new Error(error);
    }
  },
  updateUser: async (
    parent,
    { _id, user },
    { collections, ObjectID, pubSub }
  ) => {
    const storedUser = await collections.users.findOne({
      _id: ObjectID(_id)
    });
    let newUser = {
      ...storedUser,
      ...user
    };
    try {
      const res = await collections.users.updateOne(
        { _id: ObjectID(_id) },
        { $set: newUser }
      );
      if (res.matchedCount !== 1) {
        throw new Error("error.user_not_found");
      }

      return newUser;
    } catch (e) {
      throw new Error(e.message);
    }
  },
  deleteUser: async (parent, { _id }, { collections, ObjectID, pubSub }) => {
    // const operation = async transaction => {
    //   await transaction.start();
    //   try {
    //     let response = await collections.users.deleteOne(
    //       {
    //         _id: ObjectID(_id)
    //       },
    //       { session: transaction.getSession() }
    //     );
    //     if (response.deletedCount !== 1) {
    //       throw new Error("error.user_not_found");
    //     }
    //     const charities = await collections.charities
    //       .find({
    //         users: [_id]
    //       })
    //       .toArray();
    //     if (charities?.length) {
    //       charities.forEach(async c => {
    //         const users = c.users.filter(u => u !== _id);
    //         await collections.charities.updateOne(
    //           { _id: ObjectID(c._id) },
    //           { $set: { users } },
    //           { session: transaction.getSession() }
    //         );
    //       });
    //     }
    //     await transaction.commit();
    //     await transaction.end();
    //     return "Successful";
    //   } catch (e) {
    //     throw new Error(e.message);
    //   }
    // };
    // return await new Transaction(operation);
  },
  affiliateUserToCharity: async (
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
