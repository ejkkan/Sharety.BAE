import Mutation from "./mutations";
import Query from "./queries";
import Connectors from "./connectors";

import { GraphQLScalarType } from "graphql";
import { Kind } from "graphql/language";

export default {
  Mutation,
  Query,
  ...Connectors
  // Date: new GraphQLScalarType({
  //   name: "Date",
  //   description: "Date custom scalar type",
  //   parseValue(value) {
  //     return new Date(value); // value from the client
  //   },
  //   serialize(value) {
  //     console.log("value", value);
  //     return value.getTime(); // value sent to the client
  //   },
  //   parseLiteral(ast) {
  //     console.log("ast", ast);
  //     console.log("Kind.INT", Kind.INT);
  //     if (ast.kind === Kind.INT) {
  //       console.log("hits");
  //       return new Date(ast.value); // ast value is always in string format
  //     }
  //     console.log("misses");
  //     return null;
  //   }
  // })
};
