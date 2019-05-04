import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  createUser: async (parent, { user }, { collections }, info) => {
    const password = await bcrypt.hash(user.password, 10);
    let newUser = {
      email: user.email,
      username: user.username,
      password: password,
      permissions: user.permissions
    };
    try {
      const res = await collections.users.insertOne(newUser);
    } catch (error) {
      throw new Error(error);
    }

    return newUser;
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
    try {
      let response = await collections.users.deleteOne({
        _id: ObjectID(_id)
      });

      if (response.deletedCount !== 1) {
        throw new Error("error.user_not_found");
      }

      // const charities = await collections.charities
      //   .find({
      //     users: [_id]
      //   })
      //   .toArray();

      // const updatedCharities = charities.map(c => {
      //   const filtered = c.users.filter(u => u !== _id);
      //   return {
      //     ...c,
      //     users: filtered
      //   };
      // });

      return "Successful";
    } catch (e) {
      throw new Error(e.message);
    }
  }
};
