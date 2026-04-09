import { makePrismaClient } from "@repo/core/infra/prisma";
import { PrismaUserRepository } from "@repo/core/user/infra/PrismaUserRepository";
import { GetUserUseCase } from "@repo/core/user/useCase/GetUserUseCase";
import { server } from "./server";

const db = makePrismaClient();
const container = {
  useCase: {
    user: {
      get: new GetUserUseCase(new PrismaUserRepository(db)),
    },
  },
};

export const injectContainerMiddleware = server.middleware(({ next }) => {
  return next({
    context: {
      container,
    },
  });
});
