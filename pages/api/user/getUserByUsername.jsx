import config from "../../../config";

const getUserByUsername = async (req, res, client) => {
  try {
    await client.connect();

    const user = await client
      .db(config.mongodb.database)
      .collection("users")
      .findOne(
        {
          username: req.query.username,
        },
        { collation: { locale: "en", strength: 2 } }
      );

    if (!user) throw new Error("username does not exist");

    return res.status(200).send({ data: user });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  } finally {
    await client.close();
  }
};

export default getUserByUsername;
