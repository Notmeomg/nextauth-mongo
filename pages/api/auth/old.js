import cookie from "cookie";
import jwt from "jsonwebtoken";
import connectToDatabase from "../../../utils/mongodb";

const signIn = async (req, res) => {
  if (req.method === "POST") {
    console.log("cookies: ", req.cookies);
    const token = jwt.sign({ tokenValid: true }, "mysupersecret");
    console.log(token);
    res.setHeader(
      "Set-Cookie",
      cookie.serialize("_jwt", token, {
        maxAge: 60 * 60 * 24 * 1,
        httpOnly: true,
      })
    );
    return res.status(200).send({ success: true });
    // try {
    //   const { username, password } = req.body;
    //   const { db } = await connectToDatabase();

    //   const usernameExists = await db.collection("users").findOne(
    //     { username },
    //     {
    //       collation: { locale: "en", strength: 2 },
    //       projection: { password: 0 },
    //     }
    //   );

    //   if (!usernameExists) {
    //     throw new Error("username does not exist");
    //   }

    //   const passwordExists = await db.collection("users").findOne({ password });

    //   if (!passwordExists) throw new Error("incorrect password");

    //   const user = usernameExists;
    //   return res.status(200).send({ user });
    // } catch (error) {
    //   return res.status(400).send({ error: error.message });
    // }
  }

  return res
    .status(400)
    .send({ error: "Invalid Request Method. Did you mean POST?" });
};

export default signIn;
