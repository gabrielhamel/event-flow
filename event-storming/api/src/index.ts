import { Server } from "@hocuspocus/server";

const server = new Server({
  onAwarenessUpdate(data) {
    console.log("onAwarenessUpdate", data.awareness.getStates());

    return Promise.resolve();
  },
  port: 6123,
});

await server.listen();
