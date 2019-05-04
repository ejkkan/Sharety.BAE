const { GraphQLServer, PubSub, withFilter } = require("graphql-yoga");
require("dotenv").config();

import startDB from "./db";
import attachUserId from "./middlewares/attachUserId";
import schema from "./graphql";

async function start() {
  const { db, collections, ObjectID } = await startDB();
  //const pubSub = new PubSub()

  const context = req => ({
    ...req,
    db,
    collections,
    ObjectID
    //     pubSub,
    //    withFilter
  });

  const server = new GraphQLServer({
    schema,
    context
  });

  //Middleswares
  server.express.use(attachUserId);

  server.start(
    {
      cors: {
        credentials: true,
        origin: ["http://localhost:8080", "http://localhost:3000"] // here define the origins
      },
      port: 4000,
      endpoint: "/graphql",
      subscriptions: "/subscriptions",
      playground: "/playground"
    },
    () => {
      console.log(`Server is running on http://localhost:${4000}`);
    }
  );
}

start();
