import { HocuspocusProvider, type onAwarenessChangeParameters } from "@hocuspocus/provider";
import type { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { CursorCollaborativeData } from "@repo/core/CursorCollaborativeData";
import type { StickyNoteCollaborativeData } from "@repo/core/StickyNoteCollaborativeData";
import * as Y from "yjs";

interface CollaborativeWhiteboardHandlers {
  onCreateStickyNote: (
    id: string,
    data: StickyNoteCollaborativeData,
  ) => CollaborativeEntity<StickyNoteCollaborativeData>;
  onCreateCursor: (data: CursorCollaborativeData) => CollaborativeEntity<CursorCollaborativeData>;
}

export class CollaborativeWhiteboardSession {
  private readonly provider: HocuspocusProvider;
  private readonly handlers: CollaborativeWhiteboardHandlers;
  private readonly stickyNoteCollection: Y.Map<StickyNoteCollaborativeData>;
  private readonly stickyNoteEntityCollection: Map<string, CollaborativeEntity<StickyNoteCollaborativeData>>;
  private readonly cursorEntityCollection: Map<number, CollaborativeEntity<CursorCollaborativeData>>;
  private readonly cursorColor: string;

  constructor(url: string, handlers: CollaborativeWhiteboardHandlers) {
    this.handlers = handlers;
    this.provider = new HocuspocusProvider({
      document: new Y.Doc(),
      name: "example-document",
      onAwarenessChange: this.handleAwarenessChange.bind(this),
      url,
    });

    this.stickyNoteEntityCollection = new Map();
    this.cursorEntityCollection = new Map();

    this.stickyNoteCollection = this.provider.document.getMap<StickyNoteCollaborativeData>(
      "stickyNotes",
    );
    this.stickyNoteCollection.observe((event) => {
      if (event.transaction.origin === null) {
        return;
      }

      event.changes.keys.forEach((change, key) => {
        if (change.action === "add") {
          const data = this.stickyNoteCollection.get(key) as StickyNoteCollaborativeData;
          const stickyNote = handlers.onCreateStickyNote(key, data);
          this.stickyNoteEntityCollection.set(stickyNote.id(), stickyNote);
        } else if (change.action === "update") {
          const stickyNote = this.stickyNoteEntityCollection.get(key);
          if (!stickyNote) {
            throw new Error("Sticky note not found");
          }

          const newData = this.stickyNoteCollection.get(key) as StickyNoteCollaborativeData;
          stickyNote.updateFromCollaborativeData(newData);
        }
      });
    });

    this.cursorColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;
  }

  dispose() {
    this.provider.destroy();
  }

  addStickyNote(stickyNote: CollaborativeEntity<StickyNoteCollaborativeData>) {
    this.stickyNoteCollection.set(stickyNote.id(), stickyNote.collaborativeData());
    this.stickyNoteEntityCollection.set(stickyNote.id(), stickyNote);
  }

  updateStickyNote(id: string, data: StickyNoteCollaborativeData) {
    this.stickyNoteCollection.set(id, data);
  }

  updateCursorPosition(x: number, y: number) {
    this.provider.setAwarenessField("cursor", {
      color: this.cursorColor,
      x,
      y,
    });
  }

  private handleAwarenessChange(data: onAwarenessChangeParameters) {
    if (!this.provider.awareness) {
      throw new Error("Awareness is not defined");
    }

    const localClientId = this.provider.awareness.clientID;

    data.states.forEach((state) => {
      if (state.clientId === localClientId) {
        return;
      }

      const cursorCollaborativeData = state.cursor as CursorCollaborativeData;
      const alreadyExistingCursor = this.cursorEntityCollection.get(state.clientId);
      if (alreadyExistingCursor) {
        alreadyExistingCursor.updateFromCollaborativeData(cursorCollaborativeData);
        return;
      }

      const cursor = this.handlers.onCreateCursor(cursorCollaborativeData);

      this.cursorEntityCollection.set(state.clientId, cursor);
    });
  }
}
