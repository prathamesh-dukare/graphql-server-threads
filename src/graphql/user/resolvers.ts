import UserService, { CreateUser } from "../../services/user";

const queries = {
  loginUser: async (_: any, args: { email: string; password: string }) => {
    console.log(args, "args");

    return await UserService.Login(args);
  },

  GetLoggedInUser: async (_: any, args: any, context: any) => {
    console.log(context, "context");
    if (context && context.user) {
      return context.user;
    }
    return null;
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
