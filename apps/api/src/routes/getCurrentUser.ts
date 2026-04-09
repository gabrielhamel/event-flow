import { authMiddleware } from "../authMiddleware";
import { server } from "../server";

export const getCurrentUserHandler = server.user.current
  .use(authMiddleware)
  .handler(({ context }) => {
    return {
      id: context.currentUserId,
    };
  });
