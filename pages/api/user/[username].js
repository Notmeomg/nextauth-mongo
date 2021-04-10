import getUserByUsername from "./getUserByUsername";

export default (req, res) => {
  switch (req.method) {
    case "GET":
      return getUserByUsername(req, res);
    default:
      return res.status(500).send({ error: "req.method not allowed" });
  }
};
