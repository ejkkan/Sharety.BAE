const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
import getCollections from "./collections";
export let client = null;

export default async () => {
  try {
    // const dbUrl = process.env.production
    //   ? process.env.PROD_DB
    //   : process.env.DEV_DB;
    // const dbUrl =
    //   "mongodb://admin:T2fOEtAmGddNL9Ae@SG-playground-20964.servers.mongodirector.com:48469,SG-playground-20965.servers.mongodirector.com:48469,SG-playground-20966.servers.mongodirector.com:48469/admin?replicaSet=RS-playground-0&ssl=true";
    const dbUrl = process.env.LOCAL_DB;
    client = await MongoClient.connect(
      "mongodb://127.0.0.1:27017/graphql-development",
      {
        //useCreateIndex: true,
        useNewUrlParser: true
      }
    );

    // const dbName = process.env.production
    //   ? process.env.PROD_DB_NAME
    //   : process.env.DEV_DB_NAME;

    const db = client.db("graphql-development");
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
