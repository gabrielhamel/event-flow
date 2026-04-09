import { implement } from "@orpc/server";
import { routerContract } from "@repo/core/infra/api/router";

export const server = implement(routerContract);
