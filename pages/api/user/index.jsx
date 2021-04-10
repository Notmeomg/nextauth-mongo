import createUser from "./createUser";

export default async (req, res) => {
  switch (req.method) {
    case "POST":
      return createUser(req, res);
    default:
      return res.status(500).send({ error: "req.method not allowed" });
  }
};
