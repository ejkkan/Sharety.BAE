const { GraphQLServer, PubSub, withFilter } = require("graphql-yoga");
require("dotenv").config();

import startDB from "./db";
import attachUserCredentials from "./middlewares/attachUserCredentials";
import schema from "./graphql";

const { Pool } = require("pg");

const pool = new Pool({
  connectionString: process.env.DB
});
const text = "INSERT INTO items(text) VALUES($1) RETURNING *";
const values = ["brianc"];

// pool.query(
//   "CREATE TABLE items(id SERIAL PRIMARY KEY, text VARCHAR(40) not null)"
// );
pool.query(text, values, (err, res) => {
  if (err) {
    console.log(err.stack);
  } else {
    console.log(res.rows[0]);
    // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
  }
});

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});

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
