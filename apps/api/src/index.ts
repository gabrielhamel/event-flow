import { Hocuspocus } from "@hocuspocus/server";
import { implement } from "@orpc/server";
import { RPCHandler } from "@orpc/server/node";
import { routerContract } from "@repo/core/infra/api/router";
import { auth } from "@repo/core/infra/auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express from "express";
import expressWebsockets from "express-ws";

const collaborationServer = new Hocuspocus({
  onAwarenessUpdate() {
    return Promise.resolve();
  },
});

const { app } = expressWebsockets(express());

app.use(cors({ credentials: true, origin: true }));

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

const orpcServer = implement(routerContract);
const orpcRouter = orpcServer.router({
  user: {
    current: orpcServer.user.current.handler(() => {
      return {
        email: "gabriel@example.com",
      };
    }),
  },
});
const orpcHandler = new RPCHandler(orpcRouter);

app.use("/api{/*path}", async (req, res, next) => {
  const { matched } = await orpcHandler.handle(req, res, {
    prefix: "/api",
  });

  if (matched) {
    return;
  }

  next();
});

app.listen(8080, () => console.log("Listening on 8080"));
