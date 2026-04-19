import { implement } from "@orpc/server";
import { routerContract } from "@repo/core/infra/routerContract";

export const server = implement(routerContract);
