//import Transaction from "../../../utils/transaction";
import Transaction from "../../../utils/transactionWithRetry";

import { getCurrency } from "../../../utils/country-currencies";

export default {
  createCharity: async (
    parent,
    { charity },
    { collections, ObjectID },
    info
  ) => {
    const operation = async transaction => {
      await transaction;
      try {
        await transaction.start();
        const user = await collections.users.findOne({
          _id: ObjectID(charity.manager)
        });
        if (!user) throw new Error("Could not find that user");
        let newCharity = {
          title: charity.title,
          description: charity.description,
          managers: [charity.manager]
        };
        const res = await collections.charities.insertOne(newCharity, {
          session: transaction.getSession()
        });
        const res2 = await collections.users.update(
          { _id: ObjectID(user._id) },
          { $push: { charities: newCharity._id } },
          { session: transaction.getSession() }
        );
        if (res2.result.nModified !== 1) {
          throw new Error("Failed to update user with new charity");
        }
        await transaction.commit();
        await transaction.end();
        return newCharity;
      } catch (e) {
        throw new Error(e);
      }
    };
    return await new Transaction().run(operation);
  },
  deleteCharity: async (parent, { _id }, { collections, ObjectID, pubSub }) => {
    try {
      const transaction = await new Transaction();
      await transaction.start();
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
    { charity, manager },
    { collections, ObjectID, pubSub }
  ) => {
    const u = await collections.users.findOne({
      _id: ObjectID(manager)
    });
    const c = await collections.charities.findOne({
      _id: ObjectID(charity)
    });
    if (c?.managers?.includes(manager))
      throw new Error("Charity already affiliated to user");
    if (u?.charities?.includes(charity))
      throw new Error("User already affiliated to charity");

    await collections.charities.update(
      { _id: ObjectID(charity) },
      { $push: { users: manager } }
    );
    await collections.users.update(
      { _id: ObjectID(manager) },
      { $push: { charities: charity } }
    );
    return {
      manager: u,
      charity: c
    };
  }
};
