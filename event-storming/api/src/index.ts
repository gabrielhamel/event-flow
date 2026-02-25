import { Hocuspocus } from "@hocuspocus/server";
import express from "express";
import expressWebsockets from "express-ws";

const collaborationServer = new Hocuspocus({
  onAwarenessUpdate() {
    return Promise.resolve();
  },
});

const { app } = expressWebsockets(express());

app.get("/healthcheck", (_, response) => {
  response.send("OK");
});

app.ws("/api/event-storming/collaboration", (websocket, request) => {
  const context = {
    randomKey: "randomValue",
  };

  collaborationServer.handleConnection(websocket, request, context);
});

app.listen(8080, () => console.log("Listening on 8080"));
