import type { ContractRouterClient } from "@orpc/contract";
import { createORPCClient } from "@orpc/client";
import { RPCLink } from "@orpc/client/fetch";
import { createTanstackQueryUtils } from "@orpc/tanstack-query";
import { routerContract } from "@repo/core/infra/routerContract";
import { configs } from "./configs";

const link = new RPCLink({
  url: configs.apiBaseUrl,
  fetch: (input, init) =>
    fetch(input, {
      ...init,
      credentials: "include",
    }),
});

export const apiClient: ContractRouterClient<typeof routerContract> = createORPCClient(link);

export const apiViewClient = createTanstackQueryUtils(apiClient);
