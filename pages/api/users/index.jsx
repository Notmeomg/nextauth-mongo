import getUsers from "./getUsers";

export default async (req, res) => {
  switch (req.method) {
    case "GET":
      return getUsers(req, res);
    default:
      return res.status(500).send({ error: "req.method not allowed" });
  }
};
