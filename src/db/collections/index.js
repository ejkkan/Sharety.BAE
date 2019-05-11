import UsersCollection from "./users";
import CharitiesCollection from "./charities";
import CampaignsCollection from "./campaigns";
import SubscriptionCollection from "./subscriptions";
import SubscriptionItemsCollection from "./subscriptionItems";

export default async database => {
  const users = await UsersCollection(database);
  const charities = await CharitiesCollection(database);
  const campaigns = await CampaignsCollection(database);
  const subscription = await SubscriptionCollection(database);
  const subscriptionItem = await SubscriptionItemsCollection(database);
  return {
    users,
    charities,
    campaigns,
    subscription,
    subscriptionItem
  };
};
