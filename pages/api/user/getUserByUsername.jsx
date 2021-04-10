import connectToDatabase from "../../../util/mongodb";

const getUserByUsername = async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    const user = await db.collection("users").findOne(
      {
        username: req.query.username,
      },
      { collation: { locale: "en", strength: 2 } }
    );

    if (!user) throw new Error("username does not exist");

    return res.status(200).send({ data: user });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export default getUserByUsername;
