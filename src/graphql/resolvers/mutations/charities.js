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
};
