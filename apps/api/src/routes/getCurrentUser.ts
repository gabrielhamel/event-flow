import { authMiddleware } from "../authMiddleware";
import { injectContainerMiddleware } from "../injectContainerMiddleware";
import { server } from "../server";

export const getCurrentUserHandler = server.user.current
  .use(authMiddleware)
  .use(injectContainerMiddleware)
  .handler(async ({ context }) => {
    const result = await context.container.useCase.user.get.execute(context.currentUserId);

    if (result.isErr()) {
      throw result.error;
    }

    return result.value;
  });
