import { mergeTypes } from "merge-graphql-schemas";

import User from "./users";
import Charity from "./charities";
import Campaign from "./campaigns";
import Enums from "./enums";
import Authentication from "./authentication";

const typeDefs = [User, Charity, Campaign, Enums, Authentication];

export default mergeTypes(typeDefs, { all: true });
