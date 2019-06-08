export default {
  createSubscription: async (
    parent,
    args,
    { collections, ObjectID, request },
    info
  ) => {
    const { userId } = request;
    if (!userId) {
      throw new Error("You must be signed");
    }

    const { quantity, id } = args;
    const charityId = id;
    if (!quantity) {
      throw new Error("You have pick an amount");
    }

    const user = await collections.users.findOne({
      _id: ObjectID(_id)
    });
    // let hej = await stripe.createPlan();
    //let hej = await stripe.getPlans("prod_Ed8RDgupJZzJJQ");
    // console.log("GEH", hej);
    // return;
    if (!user.stripeCardId) {
      throw new Error("Add credit card");
    }

    const stripeUser = await stripe.getUser(user.stripeId);

    let stripeSubscription,
      sharetySubscription = null;

    //stripeSubscription = await stripe.getSubscription(user.stripeId);
    //User does not have an active subscription, need to add it
    if (stripeUser.subscriptions.data.length === 0) {
      try {
        stripeSubscription = await stripe.createSubscription(
          user.stripeId,
          charityId,
          quantity
        );

        sharetySubscription = await ctx.db.mutation.createSubscription(
          {
            data: {
              user: {
                connect: { id: user.id }
              },
              stripeId: stripeSubscription.id,
              chargeAt: new Date(stripeSubscription.billing_cycle_anchor)
            }
          },
          `{ id }`
        );
      } catch (error) {
        throw new Error(error);
      }
    } else {
      //User has active subscriptions, then add new subscription to it
      stripeSubscription = stripeUser.subscriptions.data[0];
      sharetySubscription = user.subscription;

      try {
        stripeSubscriptionItem = await stripe.createSubscriptionItem(
          stripeSubscription.id,
          charityId,
          quantity
        );
      } catch (error) {
        throw new Error("stripe error: " + error);
      }
    }
    //TODO: check if current plan exist for the charity, then update it

    return await ctx.db.mutation.createSubscriptionItem(
      {
        data: {
          subscription: {
            connect: { id: sharetySubscription.id }
          },
          user: {
            connect: { id: user.id }
          },
          charity: {
            connect: { id: charityId }
          },
          amount: quantity
        }
      },
      `{ id }`
    );
  }
};
