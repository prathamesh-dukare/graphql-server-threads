import express from "express";
import { expressMiddleware } from "@apollo/server/express4";
import createApolloServer from "./graphql";
import UserService from "./services/user";
const PORT = Number(process.env.PORT) || 4000;

async function init() {
  const app = express();
  app.use(express.json());

  app.use(
    "/graphql",
    expressMiddleware(await createApolloServer(), {
      context: async ({ req }) => {
        const token = req.headers.authorization || "";
        console.log(token, "Authorization");

        try {
          const user = UserService.decodeJWTToken(token as string);
          return { user };
        } catch (error) {
          return {};
        }
      },
    })
  );

  app.get("/", (req, res) => {
    res.send("Server is running");
  });

  app.listen(4000, () => {
    console.log("Server is running on port", PORT);
  });
}

init();
