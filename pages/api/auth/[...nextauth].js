import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import Adapters from "next-auth/adapters";
// import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import Adapter from "../../../utils/adapter";
import Models from "../../../models";
// import connectToDatabase from "../../../utils/mongodb";
import prisma from "../../../prisma";

// const prisma = new PrismaClient();

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
        const user = await prisma.customer.findUnique({
          where: {
            email,
          },
        });
        console.log(user);

        return;
        // const { db } = await connectToDatabase();
        // const user = await db
        //   .collection("users")
        //   .findOne({ email }, { collation: { locale: "en", strength: 2 } });

        // console.log(user);

        // if (user) {
        //   if (!user.password) throw new Error("Password not set");
        //   const validPassword = bcrypt.compareSync(password, user.password);
        //   if (!validPassword) throw new Error("Incorrect Password");
        //   delete user.password;

        //   return Promise.resolve(user);
        // }
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
    console.log(user);
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
  adapter: Adapters.Prisma.Adapter({
    prisma,
    modelMapping: {
      User: "customer",
      Account: "customerOAuthAccounts",
      Session: "customerSessions",
      VerificationRequest: "customerVerificationRequests",
    },
  }),
  debug: true,
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
