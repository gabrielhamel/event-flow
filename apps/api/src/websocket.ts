import { Database } from "@hocuspocus/extension-database";
import { Hocuspocus } from "@hocuspocus/server";

export const websocketHandler = new Hocuspocus({
  onAwarenessUpdate() {
    return Promise.resolve();
  },
  extensions: [
    new Database({
      fetch: (data) => {
        console.log("fetch", data);

        return Promise.resolve(null);
      },
      store: (data) => {
        console.log("store", data);

        return Promise.resolve();
      },
    }),
  ],
});
