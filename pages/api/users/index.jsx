import _ from "lodash";
import connectToDatabase from "../../../util/mongodb";

const handleProjections = (excludeFields) => {
  if (!excludeFields) return null;

  if (_.isArray(excludeFields)) {
    const exclude = {};
    excludeFields.forEach((field) => {
      exclude[field] = 0;
    });
    return exclude;
  }

  return { [excludeFields]: 0 };
};

export default async (req, res) => {
  if (req.method === "GET") {
    const { excludeFields } = req.query;
    try {
      const { db } = await connectToDatabase();

      const users = await db
        .collection("users")
        .find(
          {},
          {
            projection: { password: 0, ...handleProjections(excludeFields) },
          }
        )
        .toArray();

      if (!users) throw new Error("no users exist");

      return res.status(200).send({ data: users });
    } catch (error) {
      return res.status(400).send({ error: error.message });
    }
  } else
    return res
      .status(400)
      .send({ error: "Invalid Request Method. Did you mean GET?" });
};
