import express from "express";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import prismaClient from "./lib/db";
const PORT = Number(process.env.PORT) || 4000;

async function init() {
  const app = express();
  app.use(express.json());

  const apolloServer = new ApolloServer({
    typeDefs: `
      type Query {
        hello: String,
        greet(nam:String): String
      }

      type Mutation {
        createUser( email:String, firstName: String, password: String): String
      }
    `,
    resolvers: {
      Query: {
        hello: () => "Hello World",
        greet: (_, { nam }: { nam: String }) =>
          `Hello from the greet query ${nam}`,
      },
      Mutation: {
        createUser: async (
          _,
          {
            email,
            firstName,
            password,
          }: {
            email: String;
            firstName: String;
            password: String;
          }
        ): Promise<String> => {
          // Create user logic
          await prismaClient.user.create({
            data: {
              email: email as string,
              firstName: firstName as string,
              password: password as string,
              salt: "jdkef",
            },
          });

          return "created ";
        },
      },
    },
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
