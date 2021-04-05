import { MongoClient } from "mongodb";
import config from "../../../config";
import getUserByUsername from "./getUserByUsername";

export default (req, res) => {
  const client = new MongoClient(config.mongodb.uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  switch (req.method) {
    case "GET":
      console.log(req);
      return getUserByUsername(req, res, client);
    default:
      return res.status(500).send({ error: "req.method not allowed" });
  }
};
