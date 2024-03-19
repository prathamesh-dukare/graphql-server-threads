import { createHmac, randomBytes } from "node:crypto";
import prismaClient from "../lib/db";
import JWT from "jsonwebtoken";

export type CreateUser = {
  password: string;
  email: string;
  firstName: string;
  lastName?: string;
};

class UserService {
  // * helper methods
  private static getHash(input: string, salt: string) {
    const hash = createHmac("sha256", salt).update(input).digest("hex");
    return hash;
  }

  private static async getUserByEmail(email: string) {
    return await prismaClient.user.findUnique({
      where: {
        email,
      },
    });
  }

  //   * Service methods
  static async CreateUser(payload: CreateUser) {
    const { password, email, firstName, lastName } = payload;
    const salt = randomBytes(8).toString("hex");
    const hashedPass = this.getHash(password, salt);

    return prismaClient.user.create({
      data: {
        email,
        firstName,
        lastName,
        password: hashedPass,
        salt,
      },
    });
  }

  static async Login(payload: { email: string; password: string }) {
    const { email, password } = payload;
    const user = await this.getUserByEmail(email);

    if (!user) {
      throw new Error("User not found");
    }

    const hashedPass = this.getHash(password, user.salt);

    if (hashedPass !== user.password) {
      throw new Error("Invalid password");
    }

    const JWT_SECRET = "loda";

    // create a token
    const token = JWT.sign(
      {
        id: user.id,
        email: email,
        firstName: user.firstName,
        lastName: user.lastName,
      },
      JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );
    console.log(token);
    return token;
  }
}

export default UserService;
