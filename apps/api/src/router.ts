import { RPCHandler } from "@orpc/server/node";
import { RequestHeadersPlugin } from "@orpc/server/plugins";
import { getCurrentUserHandler } from "./routes/getCurrentUser";
import { server } from "./server";

const router = server.router({
  user: {
    current: getCurrentUserHandler,
  },
});

export const routerHandler = new RPCHandler(router, {
  plugins: [new RequestHeadersPlugin()],
});
