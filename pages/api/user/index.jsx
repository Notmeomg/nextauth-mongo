import { MongoClient } from "mongodb";
import config from "../../../config";
import createUser from "./createUser";

export default async (req, res) => {
  const client = new MongoClient(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  switch (req.method) {
    case "POST":
      return createUser(req, res, client);
    default:
      return res.status(500).send({ error: "req.method not allowed" });
  }
};
