import { mergeTypes } from "merge-graphql-schemas";

import Users from "./users";
import Charities from "./charities";
import Campaigns from "./campaigns";
import Enums from "./enums";
import Authentication from "./authentication";
import Subscription from "./subscriptions";
import SubscriptionItem from "./subscriptionItems";
import Plan from "./plans";

const typeDefs = [
  Users,
  Charities,
  Campaigns,
  Enums,
  Authentication,
  Subscription,
  SubscriptionItem,
  Plan
];

export default mergeTypes(typeDefs, { all: true });
