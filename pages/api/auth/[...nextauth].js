import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcryptjs";
import Adapters from "next-auth/adapters";
import { DefaultNamingStrategy } from "typeorm";
// import { snakeCase } from "typeorm/util/StringUtils";
import Models from "../../../models";
import connectToDatabase from "../../../utils/mongodb";

class CustomNamingStrategy extends DefaultNamingStrategy {
  tableName(targetName, userSpecifiedName) {
    console.log(101, targetName, userSpecifiedName);
    console.log(101, this.targetName, this.userSpecifiedName);
    return userSpecifiedName || targetName;
  }
}

const providers = [
  Providers.Credentials({
    id: "credentials",
    name: "Credentials",
    credentials: {
      username: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    authorize: async ({ email, password }) => {
      try {
        const { db } = await connectToDatabase();
        const user = await db
          .collection("users")
          .findOne({ email }, { collation: { locale: "en", strength: 2 } });

        console.log(user);

        if (user) {
          if (!user.password) throw new Error("Password not set");
          const validPassword = bcrypt.compareSync(password, user.password);
          if (!validPassword) throw new Error("Incorrect Password");
          delete user.password;

          return Promise.resolve(user);
        }
        throw new Error("Email does not exist");
      } catch (error) {
        throw new Error(error.message);
      }
    },
  }),
  Providers.GitHub({
    clientId: process.env.GITHUB_CLIENT_ID,
    clientSecret: process.env.GITHUB_CLIENT_SECRET,
  }),
];

const callbacks = {
  signIn: async (user) => {
    // console.log(user);
  },
  jwt: async (token, user) => {
    if (user) return { ...token, ...user };
    return Promise.resolve(token);
  },
  session: async (session, user) => {
    if (user) return { ...session, user: { ...user } };
    return Promise.resolve(session);
  },
};

const options = {
  providers,
  debug: true,
  adapter: Adapters.TypeORM.Adapter(
    {
      type: "mongodb",
      url: process.env.MONGODB_URI,
      synchronize: true,
      namingStrategy: new CustomNamingStrategy(),
    },
    {
      models: {
        User: Models.User,
      },
    }
  ),
  // database: process.env.MONGODB_URI,
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    jwt: true,
    maxAge: 60 * 60 * 24 * 2, // 2 day
    updateAge: 60 * 60 * 24, // 1 day
  },
  jwt: {
    secret: "INp8IvdIyeMcoGAgFGoA61DdBglwwSqnXJZkgz8PSnw",
  },
  pages: {
    signIn: "/",
    signOut: "/",
    error: "/", // Error code passed in query string as ?error=
    verifyRequest: "/", // (used for check email message)
    newUser: null, // If set, new users will be directed here on first sign in
  },
  callbacks,
  events: {
    error: async (message) => {
      console.log(message);
    },
  },
};

export default (req, res) => NextAuth(req, res, options);
