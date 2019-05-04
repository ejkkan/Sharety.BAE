import users from "./users";
import charities from "./charities";
import campaigns from "./campaigns";
import authentication from "./authentication";

export default {
  ...users,
  ...charities,
  ...campaigns,
  ...authentication
};
