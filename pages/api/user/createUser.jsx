import { Long } from "mongodb";
import userSchema from "./userSchema";
import connectToDatabase from "../../../util/mongodb";

const usernameExists = async (req, db) => {
  const exists = await db.collection("users").findOne(
    {
      username: req.body.username,
    },
    { collation: { locale: "en", strength: 2 } }
  );

  if (exists) throw new Error("username already exists");
};

const insertUser = async (req, db) => {
  const user = await db
    .collection("users")
    .insertOne({ ...req.body, age: Long.fromInt(req.body.age) });

  return user;
};

const createUser = async (req, res) => {
  const { error: schemaError } = userSchema.validate(req.body);

  if (!schemaError) {
    try {
      const { db } = await connectToDatabase();
      await usernameExists(req, db);
      const user = await insertUser(req, db);
      return res.status(200).send({ data: user.ops[0] });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  return res.status(400).send(schemaError.message);
};

export default createUser;
