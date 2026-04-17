import { RPCHandler } from "@orpc/server/node";
import { RequestHeadersPlugin } from "@orpc/server/plugins";
import { createEventStormingHandler } from "./routes/createEventStorming";
import { getCurrentUserHandler } from "./routes/getCurrentUser";
import { getEventStormingHandler } from "./routes/getEventStorming";
import { server } from "./server";

const router = server.router({
  user: {
    current: getCurrentUserHandler,
  },
  eventStorming: {
    get: getEventStormingHandler,
    create: createEventStormingHandler,
  },
});

export const routerHandler = new RPCHandler(router, {
  plugins: [new RequestHeadersPlugin()],
});
