export default async db => {
  try {
    const collection = await db.createCollection("charities");

    collection.createIndex({ title: 1 }, { unique: true });

    return collection;
  } catch (e) {
    throw new Error(e);
  }
};
