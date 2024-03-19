import UserService, { CreateUser } from "../../services/user";

const queries = {
  loginUser: async (_: any, args: { email: string; password: string }) => {
    console.log(args, "args");

    return await UserService.Login(args);
  },
};

const mutations = {
  createUser: async (_: any, args: CreateUser) => {
    let newUser = await UserService.CreateUser(args);
    return newUser.id;
  },
};

export const resolvers = {
  queries,
  mutations,
};
