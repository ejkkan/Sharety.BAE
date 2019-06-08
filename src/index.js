import "./utils/dotenv";
const { GraphQLServer, PubSub, withFilter } = require("graphql-yoga");

import startDB from "./db";
import attachUserCredentials from "./middlewares/attachUserCredentials";
import schema from "./graphql";

async function start() {
  const { db, collections, ObjectID } = await startDB();
  //const pubSub = new PubSub()

  const context = req => ({
    ...req,
    db,
    collections,
    ObjectID
    //    pubSub,
    //    withFilter
  });

  const server = new GraphQLServer({
    schema,
    context
  });

  //Middleswares
  server.express.use(attachUserCredentials);

  server.start(
    {
      cors: {
        credentials: true,
        origin: ["http://localhost:3000"] // here define the origins
      },
      port: process.env.PORT || 4000,
      endpoint: "/graphql",
      subscriptions: "/subscriptions",
      playground: "/playground"
    },
    () => {
      console.log(
        `Server is running on http://localhost:${process.env.PORT || 4000}`
      );
    }
  );
}

start();
