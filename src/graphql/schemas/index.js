import { mergeTypes } from "merge-graphql-schemas";

import Users from "./users";
import Charities from "./charities";
import Campaigns from "./campaigns";
import Enums from "./enums";
import Authentication from "./authentication";
import Subscription from "./subscription";
import SubscriptionItem from "./subscriptionItems";
import Payment from "./payment";

const typeDefs = [
  Users,
  Charities,
  Campaigns,
  Enums,
  Authentication,
  Subscription,
  SubscriptionItem,
  Payment
];

export default mergeTypes(typeDefs, { all: true });
