import Mutation from "./mutations";
import Query from "./queries";
import Connectors from "./connectors";

export default {
  Mutation,
  Query,
  ...Connectors
};
