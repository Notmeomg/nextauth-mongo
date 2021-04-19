import NextAuth from "next-auth";
import Providers from "next-auth/providers";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../utils/mongodb";

const providers = [
  Providers.Credentials({
    name: "Credentials",
    credentials: {
      username: { label: "Username", type: "text" },
      password: { label: "Password", type: "password" },
    },
    authorize: async ({ username, password }) => {
      try {
        const { db } = await connectToDatabase();
        const user = await db
          .collection("users")
          .findOne({ username }, { collation: { locale: "en", strength: 2 } });

        if (user) {
          const validPassword = await bcrypt.compare(password, user.password);
          if (!validPassword) throw new Error("Incorrect Password");
          delete user.password;
          return user;
        }
        throw new Error("Username does not exist");
      } catch (error) {
        throw new Error(error.message);
      }
    },
  }),
];

const callbacks = {
  jwt: async (token, user) => {
    if (user) return { ...token, ...user };
    return token;
  },
  session: async (session, user) => {
    if (user) return { ...session, user: { ...user } };
    return session;
  },
};

const options = {
  providers,
  database: process.env.MONGODB_URI,
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
};

export default (req, res) => NextAuth(req, res, options);
