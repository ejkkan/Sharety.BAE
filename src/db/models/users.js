export default async db => {
  try {
    const collection = await db.createCollection("users");

    collection.createIndex({ email: 1 }, { unique: true });
    collection.createIndex({ phone: 1 }, { unique: true, sparse: true });
    collection.createIndex({ username: 1 }, { sparse: true });
    collection.createIndex({ country: 1, loc: "2dsphere" }, { sparse: true });

    return collection;
  } catch (e) {
    throw new Error(e);
  }
};
