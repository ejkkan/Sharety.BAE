export default async db => {
  try {
    const collection = await db.createCollection("subscriptions");

    collection.createIndex({ name: 1 });
    collection.createIndex({ amount: 1 }, { sparse: true });
    collection.createIndex({ stripeId: 1 });
    collection.createIndex({ updatedAt: 1 });

    return collection;
  } catch (e) {
    throw new Error(e);
  }
};
