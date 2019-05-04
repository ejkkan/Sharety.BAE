import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export default {
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

      const token = jwt.sign(
        { userId: user._id, userPermissions: user.permissions },
        process.env.APP_SECRET,
        {
          expiresIn: "1h"
        }
      );

      return {
        token,
        user
      };
    } catch (e) {
      throw new Error(e);
    }
  },
  signup: async (parent, { user }, { collections }, info) => {
    const password = await bcrypt.hash(user.password, 10);
    let newUser = {
      ...user,
      password: password
    };

    try {
      const res = await collections.users.insertOne(newUser);
    } catch (error) {
      throw new Error(error);
    }

    const token = jwt.sign(
      { userId: newUser._id, userPermissions: newUser.permissions },
      process.env.APP_SECRET,
      {
        expiresIn: "1h"
      }
    );

    return { token, user: newUser };
  }
};
