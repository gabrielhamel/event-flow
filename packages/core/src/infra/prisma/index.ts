import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@repo/core/infra/prisma/client/client";

export const makePrismaClient = () => {
  const connectionString = `${process.env.DATABASE_URL}`;
  const adapter = new PrismaPg({ connectionString });

  return new PrismaClient({ adapter });
};
