import connectToDatabase from "../../../util/mongodb";

const signIn = async (req, res) => {
  if (req.method === "POST") {
    try {
      const { db } = await connectToDatabase();
      return res.status(200).send({ data: true });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  }

  return res
    .status(400)
    .send({ error: "method not allowed. Did you mean POST?" });
};

export default signIn;
