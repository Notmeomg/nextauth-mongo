import Joi from "joi";
import bcrypt from "bcryptjs";
import connectToDatabase from "../../../utils/mongodb";

const userSchema = Joi.object({
  username: Joi.string().required(),
  password: Joi.string().required(),
});

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
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  const user = await db.collection("users").insertOne({
    ...req.body,
    password: hashedPassword,
  });

  delete user.ops[0].password;

  return user.ops[0];
};

const createUser = async (req, res) => {
  if (req.method === "POST") {
    const { error: schemaError } = userSchema.validate(req.body);

    if (!schemaError) {
      try {
        const { db } = await connectToDatabase();
        await usernameExists(req, db);
        const user = await insertUser(req, db);
        return res.status(200).send({ data: user });
      } catch (error) {
        return res.status(400).send({ error: error.message });
      }
    }

    return res.status(400).send(schemaError.message);
  }

  return res
    .status(400)
    .send({ error: "Invalid Request Method. Did you mean POST?" });
};

export default createUser;
