import { Hocuspocus } from "@hocuspocus/server";
import { makePrismaClient } from "@repo/core/infra/prisma";
import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import express from "express";
import expressWebsockets from "express-ws";

const collaborationServer = new Hocuspocus({
  onAwarenessUpdate() {
    return Promise.resolve();
  },
});

const db = makePrismaClient();

const auth = betterAuth({
  database: prismaAdapter(db, {
    provider: "postgresql",
  }),
  experimental: { joins: true },
});

const { app } = expressWebsockets(express());

app.get("/api/healthcheck", (_, response) => {
  response.send("OK");
});

app.ws("/api/collaboration", (websocket, request) => {
  const context = {
    randomKey: "randomValue2",
  };

  collaborationServer.handleConnection(websocket, request, context);
});

app.listen(8080, () => console.log("Listening on 8080"));
