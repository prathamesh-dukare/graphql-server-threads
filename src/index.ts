import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloServer from "./graphql";
const PORT = Number(process.env.PORT) || 4000;

async function init() {
  const app = express();
  app.use(express.json());

  app.use("/graphql", expressMiddleware(await createApolloServer()));

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.listen(4000, () => {
    console.log("Server is running on port", PORT);
  });
}

init();
