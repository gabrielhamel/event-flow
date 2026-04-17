import type { RequestHeadersPluginContext } from "@orpc/server/plugins";
import type { Id } from "@repo/core/Id";
import { ORPCError } from "@orpc/server";
import { auth } from "@repo/core/infra/auth";
import { server } from "./server";

export interface RouterContext extends RequestHeadersPluginContext {}

export const authMiddleware = server
  .$context<RouterContext>()
  .middleware(async ({ context, next }) => {
    if (!context.reqHeaders) {
      throw new ORPCError("BAD_REQUEST");
    }

    const session = await auth.api.getSession({
      headers: context.reqHeaders,
    });

    if (!session) {
      throw new ORPCError("UNAUTHORIZED");
    }

    return next({
      context: {
        currentUserId: session.user.id as Id,
      },
    });
  });
