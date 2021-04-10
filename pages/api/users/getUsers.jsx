import connectToDatabase from "../../../util/mongodb";

const handleProjections = (excludeFields) => {
  const exclude = {};
  excludeFields.forEach((field) => {
    exclude[field] = false;
  });
  return exclude;
};

const getUsers = async (req, res) => {
  try {
    const { db } = await connectToDatabase();

    const users = await db
      .collection("users")
      .find(
        {},
        {
          projection:
            req.query.excludeFields &&
            handleProjections(req.query.excludeFields),
        }
      )
      .toArray();

    if (!users) throw new Error("no users exist");

    return res.status(200).send({ data: users });
  } catch (error) {
    return res.status(400).send({ error: error.message });
  }
};

export default getUsers;
