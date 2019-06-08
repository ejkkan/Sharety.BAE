import UsersCollection from "./users";
import CharitiesCollection from "./charities";
import CampaignsCollection from "./campaigns";
import SubscriptionCollection from "./subscriptions";
import SubscriptionItemsCollection from "./subscriptionItems";
import PaymentsCollection from "./payments";

export default async database => {
  const users = await UsersCollection(database);
  const charities = await CharitiesCollection(database);
  const campaigns = await CampaignsCollection(database);
  const subscription = await SubscriptionCollection(database);
  const subscriptionItem = await SubscriptionItemsCollection(database);
  const payments = await PaymentsCollection(database);

  return {
    users,
    charities,
    campaigns,
    subscription,
    subscriptionItem,
    payments
  };
};
