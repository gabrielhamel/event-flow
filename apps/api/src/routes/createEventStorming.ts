import { authMiddleware } from "../authMiddleware";
import { injectContainerMiddleware } from "../injectContainerMiddleware";
import { server } from "../server";

export const createEventStormingHandler = server.eventStorming.create
  .use(authMiddleware)
  .use(injectContainerMiddleware)
  .handler(async ({ context, input }) => {
    const result = await context.container.useCase.eventStorming.create.execute({
      id: input.id,
      ownerId: context.currentUserId,
    });

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  });
