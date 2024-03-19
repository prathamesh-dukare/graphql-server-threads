import prismaClient from "../../lib/db";
import { UserCreateInput } from "./typedef";

const queries = {};
const mutations = {
  createUser: async (_: any, args: UserCreateInput) => {
    const { email, password, firstName } = args;
    let newUser = await prismaClient.user.create({
      data: {
        email: email,
        password: password,
        firstName: firstName,
        salt: "salt",
      },
    });

    return newUser.id;
  },
};

export const resolvers = {
  queries,
  mutations,
};
