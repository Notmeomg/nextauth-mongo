import { Long } from "mongodb";
import config from "../../../config";
import userSchema from "./userSchema";

const usernameExists = async (client, req) => {
  const exists = await client
    .db(config.mongodb.database)
    .collection("users")
    .findOne(
      {
        username: req.body.username,
      },
      { collation: { locale: "en", strength: 2 } }
    );

  if (exists) throw new Error("username already exists");
};

const insertUser = async (client, req) => {
  const user = await client
    .db(config.mongodb.database)
    .collection("users")
    .insertOne({ ...req.body, age: Long.fromInt(req.body.age) });

  return user;
};

const createUser = async (req, res, client) => {
  const { error: schemaError } = userSchema.validate(req.body);

  if (!schemaError) {
    try {
      await client.connect();

      await usernameExists(client, req);

      const user = await insertUser(client, req);

      return res.status(200).send({ data: user.ops[0] });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    } finally {
      await client.close();
    }
  }

  return res.status(400).send(schemaError.message);
};

export default createUser;
