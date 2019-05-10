const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
import getCollections from "./models";
export let client = null;

export default async () => {
  try {
    // const dbUrl = process.env.production
    //   ? process.env.PROD_DB
    //   : process.env.DEV_DB;
    const dbUrl =
      "mongodb://admin:T2fOEtAmGddNL9Ae@SG-playground-20964.servers.mongodirector.com:48469,SG-playground-20965.servers.mongodirector.com:48469,SG-playground-20966.servers.mongodirector.com:48469/admin?replicaSet=RS-playground-0&ssl=true";
    client = await MongoClient.connect(dbUrl, {
      //useCreateIndex: true,
      useNewUrlParser: true
    });

    const dbName = process.env.production
      ? process.env.PROD_DB_NAME
      : process.env.DEV_DB_NAME;

    const db = client.db(dbName);
    client.get;
    db.on("error", function(err) {
      const message = "MongoDB close" + (err ? ": " + err.message : "");
      console.log("herre", message);
    });

    const collections = await getCollections(db);

    return {
      db,
      ObjectID,
      collections
    };
  } catch (e) {
    throw new Error("mongobug: " + e);
  }
};
