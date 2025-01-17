export default {
  managers: async ({ managers }, a, { collections, ObjectID }) => {
    if (!managers?.length) return [];
    return await collections.users
      .find({ _id: { $in: managers.map(e => ObjectID(e)) } })
      .toArray();
  },
  campaigns: async ({ campaigns }, a, { collections, ObjectID }) => {
    if (!campaigns?.length) return [];
    return await collections.campaigns
      .find({ _id: { $in: campaigns.map(e => ObjectID(e)) } })
      .toArray();
  }
  // charity: async ({ charity }, a, { collections, ObjectID }) => {
  //   if (!charity) return {};
  //   return await collections.charities.findOne({
  //     _id: ObjectID(charity)
  //   });
  // },
  // user: async ({ user }, a, { collections, ObjectID }) => {
  //   console.log("useruser", user);
  //   if (!user) return {};
  //   return await collections.users.findOne({
  //     _id: ObjectID(user)
  //   });
  // }
};
