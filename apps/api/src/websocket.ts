import { Database } from "@hocuspocus/extension-database";
import { Hocuspocus } from "@hocuspocus/server";
import { makePrismaClient } from "@repo/core/infra/prisma/index";

const db = makePrismaClient();

export const websocketHandler = new Hocuspocus({
  onAwarenessUpdate() {
    return Promise.resolve();
  },
  extensions: [
    new Database({
      async fetch({ documentName }) {
        const document = await db.document.findUnique({
          where: { id: documentName },
        });

        return document?.data ?? null;
      },
      async store({ documentName, state }) {
        const data = new Uint8Array(state);

        await db.document.upsert({
          where: { id: documentName },
          create: { id: documentName, data },
          update: { data },
        });
      },
    }),
  ],
});
