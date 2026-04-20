import type { Id } from "@repo/core/Id";
import { Database } from "@hocuspocus/extension-database";
import { Hocuspocus } from "@hocuspocus/server";
import { PrismaEventStormingRepository } from "@repo/core/event-storming/infra/PrismaEventStormingRepository";
import { CreateEventStormingUseCase } from "@repo/core/event-storming/useCase/CreateEventStorming";
import { GetEventStormingUseCase } from "@repo/core/event-storming/useCase/GetEventStorming";
import { UpdateEventStormingDataUseCase } from "@repo/core/event-storming/useCase/UpdateEventStormingData";
import { makePrismaClient } from "@repo/core/infra/prisma/index";
import { PrismaUserRepository } from "@repo/core/user/infra/PrismaUserRepository";
import { GetUserUseCase } from "@repo/core/user/useCase/GetUserUseCase";

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
      updateData: new UpdateEventStormingDataUseCase(eventStormingRepository),
    },
  },
};

export const websocketHandler = new Hocuspocus({
  onAwarenessUpdate() {
    return Promise.resolve();
  },
  extensions: [
    new Database({
      async fetch({ documentName }) {
        const eventStorming = await container.useCase.eventStorming.get.execute(documentName as Id);

        if (eventStorming.isErr()) {
          return null;
        }

        return eventStorming.value.data;
      },
      async store({ documentName, state }) {
        await container.useCase.eventStorming.updateData.execute({
          id: documentName as Id,
          data: new Uint8Array(state),
        });
      },
    }),
  ],
});
