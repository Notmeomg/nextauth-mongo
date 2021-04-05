import config from "../../../config";

const handleProjections = (excludeFields) => {
  const exclude = {};
  excludeFields.forEach((field) => {
    exclude[field] = false;
  });
  return exclude;
};

const getUsers = async (req, res, client) => {
  try {
    await client.connect();

    const users = await client
      .db(config.mongodb.database)
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
  } finally {
    await client.close();
  }
};

export default getUsers;
