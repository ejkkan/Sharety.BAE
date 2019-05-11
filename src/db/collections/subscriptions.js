export default async db => {
  try {
    const collection = await db.createCollection("subscriptions");

    collection.createIndex({ user: 1 }, { unique: true });
    collection.createIndex({ stripeId: 1 }, { unique: true });
    collection.createIndex({ chargeAt: 1 });
    collection.createIndex({ updatedAt: 1 });

    return collection;
  } catch (e) {
    throw new Error(e);
  }
};
