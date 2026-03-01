import { HocuspocusProvider, type onAwarenessChangeParameters } from "@hocuspocus/provider";
import type { StickyNote, StickyNoteDocumentObject } from "@repo/core/StickyNote";
import type { WhiteboardUser } from "@repo/core/WhiteboardUser";
import { FabricCursor } from "@repo/event-storming-ui/collaboration/FabricCursor";
import { FabricUser } from "@repo/event-storming-ui/collaboration/FabricUser";
import type { Canvas } from "fabric";
import { Doc } from "yjs";

const randomizeHexColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

export class CollaborativeSession {
  private readonly provider: HocuspocusProvider;
  private readonly users = new Map<number, WhiteboardUser>();
  private readonly canvas: Canvas;
  private readonly sharedDocument: Doc;
  private readonly callback: (stickyNoteDocumentObject: StickyNoteDocumentObject) => void;

  constructor(canvas: Canvas, onStickyNoteAdded: (stickyNoteDocumentObject: StickyNoteDocumentObject) => void) {
    this.canvas = canvas;
    this.callback = onStickyNoteAdded;

    this.sharedDocument = new Doc();

    this.provider = new HocuspocusProvider({
      document: this.sharedDocument,
      name: "example-document",
      onAwarenessChange: this.onAwarenessChange.bind(this),
      url: import.meta.env.MODE === "development"
        ? "ws://localhost:8080/api/event-storming/collaboration"
        : "wss://ddd-lab.gabrielhamel.fr/api/event-storming/collaboration",
    });

    this.provider.setAwarenessField("user", {
      color: randomizeHexColor(),
    });

    this.sharedDocument.getArray("stickyNotes").observe((event) => {
      event.changes.added.forEach((item) => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        const [content] = item.content.getContent();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
        this.callback(content);
      });
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

  addStickyNote(stickyNote: StickyNote) {
    const object = stickyNote.toDocumentObject();

    this.sharedDocument.getArray("stickyNotes").push([object]);
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
