const stripe = require("stripe")(process.env.STRIPE_SECRET);
console.log("process.env.STRIPE_SECRET", process.env.STRIPE_SECRET);
const createCard = async (stripeUserId, card_token) => {
  return await stripe.customers
    .createSource(stripeUserId, {
      source: card_token
    })
    .then(card => card);
};

const createUser = async user => {
  return await stripe.customers
    .create({
      email: user.email
    })
    .then(customer => customer);
};

const getUser = async id => {
  return await stripe.customers.retrieve(id).then(customer => customer);
};

const createCharge = async (amount, currency, description, source) => {
  return await stripe.charges
    .create({
      amount,
      currency,
      description,
      source
    })
    .then(charge => charge);
};

const deleteSubscription = async subscriptionId => {
  return await stripe.subscriptions
    .del(subscriptionId)
    .then(subscription => subscription);
};

const getSubscription = async id => {
  return await stripe.subscriptions
    .retrieve(id)
    .then(subscription => subscription);
};

const getSubscriptionItem = async id => {
  return await stripe.subscriptionItems
    .retrieve(id)
    .then(subscription => subscription);
};

const createSubscription = async (stripeId, charity, quantity) => {
  return await stripe.subscriptions
    .create({
      customer: stripeId,
      items: [
        {
          plan: charity,
          quantity
        }
      ]
    })
    .then(subscription => subscription);
};

const createSubscriptionItem = async (subscriptionId, charity, quantity) => {
  if (!subscriptionId) {
    throw new Error("Missing subscription");
  }
  // if (!plan) {
  //   throw new Error("Missing amount for subscription");
  // }
  if (!charity) {
    throw new Error("Missing charity for subscription");
  }
  return await stripe.subscriptionItems
    .create({
      subscription: subscriptionId,
      plan: charity,
      quantity
    })
    .then(subscriptionItem => subscriptionItem);
};

const updateSubscriptionItem = async (subscriptionId, quantity) => {
  if (!subscriptionId) {
    throw new Error("Missing subscription");
  }
  if (!quantity) {
    throw new Error("Missing quantity for subscription");
  }
  return await stripe.subscriptionItems
    .update(subscriptionId, {
      quantity
    })
    .then(subscriptionItem => subscriptionItem);
};

const createPlan = async (id, name, currency, type) => {
  stripe.plans.create(
    {
      amount: 100,
      interval: "month",
      id,
      nickname: name,
      product: {
        name,
        type
      },
      currency
    },
    function(err, plan) {
      console.log("err, plan", err, plan);
    }
  );
};

const getPlans = async cb => {
  return await stripe.plans.list({}).then(plans => plans);
};

module.exports = {
  createCard,
  stripe,
  createPlan,
  getPlans,
  getUser,
  createUser,
  createSubscriptionItem,
  createSubscription,
  getSubscription,
  deleteSubscription,
  getSubscriptionItem,
  updateSubscriptionItem
};
