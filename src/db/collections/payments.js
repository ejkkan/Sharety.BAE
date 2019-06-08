export default async db => {
  try {
    const collection = await db.createCollection("payments");

    collection.createIndex({ user: 1 });
    collection.createIndex({ charity: 1 });
    collection.createIndex({ amount: 1 });
    collection.createIndex({ updatedAt: 1 });
    collection.createIndex({ chargedAt: 1 });

    return collection;
  } catch (e) {
    throw new Error(e);
  }
};
