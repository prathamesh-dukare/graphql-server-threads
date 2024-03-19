import { ApolloServer } from "@apollo/server";
import { User } from "./user";

async function createApolloServer() {
  const apolloServer = new ApolloServer({
    typeDefs: `
          ${User.typeDefs}
          
          type Query {
            ${User.queries}
          }
          type Mutation {
            ${User.mutations}
          }
        `,
    resolvers: {
      Query: {
        ...User.resolvers.queries,
      },
      Mutation: {
        ...User.resolvers.mutations,
      },
    },
    // context: ({ req, res }) => ({ req, res }),
  });

  await apolloServer.start();

  return apolloServer;
}

export default createApolloServer;
