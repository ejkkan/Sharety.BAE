export default {
  createCharity: async (parent, { charity }, { collections }, info) => {
    let newCharity = {
      title: charity.title,
      description: charity.description,
      users: [charity.user]
    };
    const res = await collections.charities.insertOne(newCharity);
    return newCharity;
  }
  // Charity: {
  //   // charityCampaigns: async ({ charityCampaigns }) => {
  //   //   if (!charityCampaigns.length) return [];
  //   //   return await CharityCampaign.find({ _id: { $in: charityCampaigns } });
  //   // },
  //   users: async ({ users }) => {
  //     if (!users.length) return [];
  //     return await collections.users.find({ _id: { $in: users } });
  //   }
  // }
};
