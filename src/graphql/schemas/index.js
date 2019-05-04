import { mergeTypes } from "merge-graphql-schemas";

import Users from "./users";
import Charities from "./charities";
import Campaigns from "./campaigns";
import Enums from "./enums";
import Authentication from "./authentication";

const typeDefs = [Users, Charities, Campaigns, Enums, Authentication];

export default mergeTypes(typeDefs, { all: true });
