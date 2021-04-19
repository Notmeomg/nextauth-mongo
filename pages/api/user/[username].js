import connectToDatabase from "../../../utils/mongodb";

const getUser = async (req, res) => {
  if (req.method === "GET") {
    if (req.query.username.toLowerCase() === "update")
      return res.status(400).send({
        error: "Please provide a valid username. eg. /user/update/username",
      });

    try {
      const { db } = await connectToDatabase();
      const user = await db.collection("users").findOne(
        {
          username: req.query.username,
        },
        {
          collation: { locale: "en", strength: 2 },
          projection: { password: 0 },
        }
      );

      if (!user) throw new Error("username does not exist");

      return res.status(200).send({ data: user });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }
  return res
    .status(400)
    .send({ error: "Invalid Request Method. Did you mean GET?" });
};

export default getUser;
