export default {
  charities: async ({ charities }, a, { collections, ObjectID }) => {
    console.log(charities);
    if (!charities || (charities && !charities.length)) return [];
    return await collections.charities
      .find({ _id: { $in: charities.map(e => ObjectID(e)) } })
      .toArray();
  }
};
