import { Hocuspocus } from "@hocuspocus/server";

export const websocketHandler = new Hocuspocus({
  onAwarenessUpdate() {
    return Promise.resolve();
  },
});
