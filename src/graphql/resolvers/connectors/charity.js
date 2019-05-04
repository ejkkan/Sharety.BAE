export default {
  users: async ({ users }, a, { collections, ObjectID }) => {
    if (!users || (users && !users.length)) return [];
    return await collections.users
      .find({ _id: { $in: users.map(e => ObjectID(e)) } })
      .toArray();
  },
  campaigns: async ({ campaigns }, a, { collections, ObjectID }) => {
    if (!campaigns || (campaigns && !campaigns.length)) return [];
    return await collections.campaigns
      .find({ _id: { $in: campaigns.map(e => ObjectID(e)) } })
      .toArray();
  }
};
