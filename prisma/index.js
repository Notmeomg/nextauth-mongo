import { PrismaClient } from "@prisma/client";

const connectToPrisma = (() => {
  let prisma;

  if (process.env.NODE_ENV === "production") {
    prisma = new PrismaClient();
  } else {
    if (!global.prisma) {
      global.prisma = new PrismaClient();
    }
    prisma = global.prisma;
  }

  return prisma;
})();

export default connectToPrisma;
