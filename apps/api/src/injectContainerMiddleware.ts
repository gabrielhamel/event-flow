import { PrismaEventStormingRepository } from "@repo/core/event-storming/infra/PrismaEventStormingRepository";
import { CreateEventStormingUseCase } from "@repo/core/event-storming/useCase/CreateEventStorming";
import { GetEventStormingUseCase } from "@repo/core/event-storming/useCase/GetEventStorming";
import { makePrismaClient } from "@repo/core/infra/prisma";
import { PrismaUserRepository } from "@repo/core/user/infra/PrismaUserRepository";
import { GetUserUseCase } from "@repo/core/user/useCase/GetUserUseCase";
import { server } from "./server";

const db = makePrismaClient();

const userRepository = new PrismaUserRepository(db);
const eventStormingRepository = new PrismaEventStormingRepository(db);

const container = {
  useCase: {
    user: {
      get: new GetUserUseCase(userRepository),
    },
    eventStorming: {
      get: new GetEventStormingUseCase(eventStormingRepository),
      create: new CreateEventStormingUseCase(userRepository, eventStormingRepository),
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
