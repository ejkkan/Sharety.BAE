import users from "./users";
import charities from "./charities";
import campaigns from "./campaigns";
import authentication from "./authentication";
import subscriptions from "./subscriptions";
import subscriptionItems from "./subscriptionItems";
import plans from "./plans";

export default {
  ...users,
  ...charities,
  ...campaigns,
  ...authentication,
  ...subscriptions,
  ...subscriptionItems,
  ...plans
};
