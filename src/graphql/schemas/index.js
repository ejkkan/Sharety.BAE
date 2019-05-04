import { mergeTypes } from "merge-graphql-schemas";

import User from "./users";
import Charity from "./charities";
import Campaign from "./campaigns";

const typeDefs = [User, Charity, Campaign];

export default mergeTypes(typeDefs, { all: true });
