import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { getInfraConfig } from "./config";
import { makePrismaClient } from "./prisma";

const isInDevelopment = process.env.NODE_ENV === "development";
const hostname = isInDevelopment ? null : (process.env.HOSTNAME ?? null);

const { uiBaseUrl } = getInfraConfig(isInDevelopment, hostname);

const db = makePrismaClient();

export const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  experimental: { joins: true },
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID ?? "",
      clientSecret: process.env.GITHUB_CLIENT_SECRET ?? "",
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID ?? "",
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? "",
    },
  },
  trustedOrigins: [uiBaseUrl],
});
