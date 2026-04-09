import { auth } from "@repo/core/infra/auth";
import { toNodeHandler } from "better-auth/node";
import cors from "cors";
import express, { type Express } from "express";
import expressWebsockets from "express-ws";
import { routerHandler } from "./router";
import { websocketHandler } from "./websocket";

const addWebsocketModule = (app: Express) => {
  return expressWebsockets(app).app;
};

const rawApp = express();
const app = addWebsocketModule(rawApp);

app.use(cors({ credentials: true, origin: true }));

app.all("/api/auth/*splat", toNodeHandler(auth));

app.get("/api/healthcheck", (_, response) => {
  response.send("OK");
});

app.ws("/api/collaboration", (websocket, request) => {
  websocketHandler.handleConnection(websocket, request);
});

app.use("/api{/*path}", async (req, res, next) => {
  const { matched } = await routerHandler.handle(req, res, {
    prefix: "/api",
  });

  if (matched) {
    return;
  }

  next();
});

app.listen(8080, () => console.log("API listening on 8080"));
