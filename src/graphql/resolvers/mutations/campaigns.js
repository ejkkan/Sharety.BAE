export default {
  createCampaign: async (
    parent,
    { campaign },
    { collections, ObjectID },
    info
  ) => {
    let newCampaign = {
      title: campaign.title,
      description: campaign.description,
      charity: campaign.charity
    };

    const charity = await collections.charities.findOne({
      _id: ObjectID(campaign.charity)
    });
    if (!charity) throw new Error("Could not find Charity");

    await collections.campaigns.insertOne(newCampaign);
    collections.charities.update(
      { _id: ObjectID(campaign.charity) },
      { $push: { campaigns: newCampaign._id } }
    );

    // const res = await collections.campaigns.insertOne(newCampaign);
    return newCampaign;
  }
};
