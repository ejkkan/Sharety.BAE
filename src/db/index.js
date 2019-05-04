const MongoClient = require("mongodb").MongoClient;
const ObjectID = require("mongodb").ObjectID;
import getCollections from "./models";

export default async () => {
  try {
    //console.log("dfs", `mongodb://${user}:${password}@${url}/${db}`);
    //docker mongodb://mongodb-primary/graphql-development
    const client = await MongoClient.connect(process.env.mongoURI, {
      //useCreateIndex: true,
      useNewUrlParser: true
    });

    const database = client.db("graphql-development");

    const collections = await getCollections(database);

    return {
      db: database,
      ObjectID,
      collections
    };
  } catch (e) {
    throw new Error(e);
  }
};
