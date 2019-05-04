import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
  createUser: async (parent, { user }, { collections }, info) => {
    const password = await bcrypt.hash(user.password, 10);
    let newUser = {
      email: user.email,
      username: user.username,
      password: password
    };
    try {
      console.log("collections", collections);
      const res = await collections.users.insertOne(newUser);
    } catch (error) {
      throw new Error(error);
    }

    return newUser;
  },
  signin: async (parent, { email, password }, { collections }, info) => {
    //console.log("context", context.request.userId);
    const user = await collections.users.findOne({ email });

    if (!user) {
      throw new Error(`No user found for email: ${email}`);
    }
    try {
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) {
        throw new Error("Invalid password");
      }

      const token = jwt.sign({ userId: user._id }, process.env.APP_SECRET, {
        expiresIn: "1h"
      });

      return {
        token,
        user
      };
    } catch (e) {
      throw new Error(e);
    }
  }
};
