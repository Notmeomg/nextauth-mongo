import connectToDatabase from "../../../../utils/mongodb";

const updateUser = (req, res) => {
  if (req.method === "PATCH") {
    return res.status(200).send({ success: "Coming Soon!" });
  }

  return res
    .status(400)
    .send({ error: "Invalid Request Method. Did you mean PATCH?" });
};

export default updateUser;
