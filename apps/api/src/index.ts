import { Hocuspocus } from "@hocuspocus/server";
import { toNodeHandler } from "better-auth/node";
import express from "express";
import expressWebsockets from "express-ws";
import { auth } from "./auth.js";

const collaborationServer = new Hocuspocus({
  onAwarenessUpdate() {
    return Promise.resolve();
  },
});

const { app } = expressWebsockets(express());

app.all("/api/auth/*splat", toNodeHandler(auth));

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
