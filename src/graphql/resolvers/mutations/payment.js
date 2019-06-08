import Transaction from "../../../utils/transactionWithRetry";
import { createCharge } from "../../../utils/stripe";
import { getCurrency } from "../../../utils/country-currencies";
export default {
  createPayment: async (
    parent,
    { payment },
    { collections, ObjectID, request },
    info
  ) => {
    if (!request.userId) throw new Error("You are not logged in!");
    const operation = async transaction => {
      await transaction;
      try {
        await transaction.start();
        let newPayment = payment;
        const storedUser = await collections.users.findOne({
          _id: ObjectID(request.userId)
        });

        let response = await createCharge(
          newPayment.amount,
          getCurrency("Sweden"),
          "Payment to charity",
          storedUser.creditCard
        );
        const res = await collections.payments.insertOne(newPayment, {
          session: transaction.getSession()
        });
        await transaction.commit();
        await transaction.end();
        return newPayment;
      } catch (e) {
        throw new Error(e);
      }
    };
    return await new Transaction().run(operation);
  }
};
