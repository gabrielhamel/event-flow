import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@repo/core/infra/prisma/client/client";

export const makePrismaClient = () => {
  const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL });

  return new PrismaClient({ adapter });
};

export type PrismaClientInstance = ReturnType<typeof makePrismaClient>;
