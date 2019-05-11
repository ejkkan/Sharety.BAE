export default {
  createCampaign: async (
    parent,
    { campaign },
    { collections, ObjectID, request },
    info
  ) => {
    let newCampaign = {
      title: campaign.title,
      description: campaign.description,
      charity: campaign.charity,
      createdBy: request.userId
    };

    const charity = await collections.charities.findOne({
      _id: ObjectID(campaign.charity)
    });
    if (!charity) throw new Error("Could not find Charity");

    await collections.campaigns.insertOne(newCampaign);
    const res2 = await collections.charities.update(
      { _id: ObjectID(campaign.charity) },
      { $push: { campaigns: newCampaign._id } }
    );
    if (res2.result.nModified !== 1) {
      throw new Error("Failed to update user with new charity");
    }
    collections.charities.update(
      { _id: ObjectID(campaign.charity) },
      { $push: { campaigns: newCampaign._id } }
    );
    // const res = await collections.campaigns.insertOne(newCampaign);
    return newCampaign;
  }
};
