import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
const PORT = Number(process.env.PORT) || 4000;

async function init() {
  const app = express();
  app.use(express.json());

  const apolloServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String
      }
    `,
    resolvers: {},
    // context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  app.use("/graphql", expressMiddleware(apolloServer));

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.listen(4000, () => {
    console.log("Server is running on port", PORT);
  });
}

init();
