import getUserCollection from "./users";
import getCharityCollection from "./charities";
import getCampaignsCollection from "./campaigns";

export default async database => {
  const users = await getUserCollection(database);
  const charities = await getCharityCollection(database);
  const campaigns = await getCampaignsCollection(database);

  return {
    users,
    charities,
    campaigns
  };
};
