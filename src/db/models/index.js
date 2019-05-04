import getUserCollection from "./users";
import getCharityCollection from "./charities";
import getCampaignsCollection from "./campaigns";

export default async database => {
  let users = await getUserCollection(database);
  let charities = await getCharityCollection(database);
  let campaigns = await getCampaignsCollection(database);

  return {
    users,
    charities,
    campaigns
  };
};
