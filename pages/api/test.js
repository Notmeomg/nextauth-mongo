// import { PrismaClient } from "@prisma/client";
// const prisma = new PrismaClient();
import prisma from "../../prisma";

const test = async (req, res) => {
  const email = "zach@buildasoil.com";
  console.log(prisma.customer);
  try {
    const users = await prisma.customer.findUnique({
      where: { email },
    });
    // eslint-disable-next-line no-extend-native
    BigInt.prototype.toJSON = (bigInt) => `${bigInt.toString()}n`;
    return res.status(200).send({ users });
  } catch (error) {
    console.log(error);
    return res.status(500).send({ error });
  }
};

export default test;
