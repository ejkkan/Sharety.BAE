export default async db => {
  try {
    const collection = await db.createCollection("campaigns");

    collection.createIndex({ title: 1 }, { unique: true });
    collection.createIndex({ updated: 1 }, { sparse: true });

    return collection;
  } catch (e) {
    throw new Error(e);
  }
};
