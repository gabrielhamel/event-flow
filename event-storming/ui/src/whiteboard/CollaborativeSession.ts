import { HocuspocusProvider, type onAwarenessChangeParameters } from "@hocuspocus/provider";
import type { TRGBColorSource } from "fabric";
import { Doc } from "yjs";

interface CollaborativeSessionHandlers {
  onNewUser: (userId: number, color: TRGBColorSource) => void;
  onUserCursorMove: (userId: number, x: number, y: number) => void;
}

export class CollaborativeSession {
  private readonly provider: HocuspocusProvider;
  private knownUsers = new Set<number>();
  private handlers: CollaborativeSessionHandlers;

  constructor(handlers: CollaborativeSessionHandlers) {
    this.handlers = handlers;

    const sharedDocument = new Doc();

    this.provider = new HocuspocusProvider({
      url: import.meta.env.MODE === "development"
        ? "ws://localhost:8080/api/event-storming/collaboration"
        : "wss://api-ddd-lab.gabrielhamel.fr/api/event-storming/collaboration",
      name: "example-document",
      document: sharedDocument,
      onAwarenessChange: this.onAwarenessChange.bind(this),
    });

    this.provider.setAwarenessField("user", {
      color: [Math.floor(Math.random() * 256), Math.floor(Math.random() * 256), Math.floor(Math.random() * 256)],
    });
  }

  destroy() {
    this.provider.destroy();
  }

  updateCurrentUserCursorPosition(x: number, y: number) {
    this.provider.setAwarenessField("mouse", {
      x,
      y,
    });
  }

  private onAwarenessChange(data: onAwarenessChangeParameters) {
    data.states.forEach((state) => {
      if (
        this.provider.awareness && !this.knownUsers.has(state.clientId)
        && state.clientId !== this.provider.awareness.clientID
      ) {
        this.knownUsers.add(state.clientId);
        this.handlers.onNewUser(state.clientId, state.user.color);
      }

      if (state.mouse) {
        this.handlers.onUserCursorMove(state.clientId, state.mouse.x, state.mouse.y);
      }
    });
  }
}
