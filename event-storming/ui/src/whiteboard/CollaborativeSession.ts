import { HocuspocusProvider, type onAwarenessChangeParameters } from "@hocuspocus/provider";
import type { User } from "@repo/core/collaboration/domain/User";
import { FabricCursor } from "@repo/core/collaboration/infra/fabric/FabricCursor";
import { FabricUser } from "@repo/core/collaboration/infra/fabric/FabricUser";
import type { Canvas } from "fabric";
import { Doc } from "yjs";

const randomizeHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export class CollaborativeSession {
  private readonly provider: HocuspocusProvider;
  private readonly users = new Map<number, User>();
  private readonly canvas: Canvas;

  constructor(canvas: Canvas) {
    this.canvas = canvas;

    const sharedDocument = new Doc();

    this.provider = new HocuspocusProvider({
      document: sharedDocument,
      name: "example-document",
      onAwarenessChange: this.onAwarenessChange.bind(this),
      url: import.meta.env.MODE === "development"
        ? "ws://localhost:8080/api/event-storming/collaboration"
        : "wss://ddd-lab.gabrielhamel.fr/api/event-storming/collaboration",
    });

    this.provider.setAwarenessField("user", {
      color: randomizeHexColor(),
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
        this.provider.awareness && !this.users.has(state.clientId)
        && state.clientId !== this.provider.awareness.clientID
      ) {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        const cursor = FabricCursor.make(this.canvas, state.user.color);
        const user = new FabricUser(state.clientId, cursor);

        this.users.set(user.getId(), user);
      }

      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      if (state.mouse) {
        const user = this.users.get(state.clientId);
        if (!user) {
          return;
        }

        const cursor = user.getCursor();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument,@typescript-eslint/no-unsafe-member-access
        cursor.setPosition(state.mouse.x, state.mouse.y);
      }
    });
  }
}
