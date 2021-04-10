import { MongoClient } from "mongodb";

const { MONGODB_URI, MONGODB_DB } = process.env;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

if (!MONGODB_DB) {
  throw new Error(
    "Please define the MONGODB_DB environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongo;

if (!cached) {
  cached = { conn: null, promise: null };
  global.mongo = cached;
}

const connectToDatabase = async () => {
  try {
    if (cached.conn) {
      console.log("Using cached database instance");
      return cached.conn;
    }

    if (!cached.promise) {
      const opts = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      };

      cached.promise = MongoClient.connect(MONGODB_URI, opts).then(
        (client) => ({
          client,
          db: client.db(MONGODB_DB),
        })
      );
    }
    cached.conn = await cached.promise;
    console.log("New DB Connection");
    return cached.conn;
  } catch (error) {
    console.log("Mongo connect Error");
    console.log(error);
    return error;
  }
};

export default connectToDatabase;
