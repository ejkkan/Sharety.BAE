export default {
  charity: async ({ charity }, a, { collections, ObjectID }) => {
    if (!charity) return null;
    return await collections.charities.findOne({
      _id: ObjectID(charity)
    });
  },
  createdBy: async ({ createdBy }, a, { collections, ObjectID }) => {
    if (!createdBy) return {};
    return await collections.users.findOne({
      _id: ObjectID(createdBy)
    });
  }
};
