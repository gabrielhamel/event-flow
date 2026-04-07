import { HocuspocusProvider, type onAwarenessChangeParameters } from "@hocuspocus/provider";
import type { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { Id } from "@repo/core/Id";
import type { Cursor } from "@repo/core/whiteboard/objects/Cursor";
import type { CursorFactory } from "@repo/core/whiteboard/objects/factories/CursorFactory";
import type { StickyNoteFactory } from "@repo/core/whiteboard/objects/factories/StickyNoteFactory";
import type { StickyNote } from "@repo/core/whiteboard/objects/StickyNote";
import * as Y from "yjs";

export class WhiteboardSession {
  private readonly provider: HocuspocusProvider;
  private readonly stickyNoteFactory: StickyNoteFactory;
  private readonly cursorFactory: CursorFactory;
  private readonly stickyNoteCollection: Y.Map<StickyNote>;
  private readonly stickyNoteEntityCollection: Map<string, CollaborativeEntity<StickyNote>>;
  private readonly cursorEntityCollection: Map<number, CollaborativeEntity<Cursor>>;
  private readonly cursorColor: string;

  constructor(url: string, stickyNoteFactory: StickyNoteFactory, cursorFactory: CursorFactory) {
    this.stickyNoteFactory = stickyNoteFactory;
    this.cursorFactory = cursorFactory;

    this.provider = new HocuspocusProvider({
      document: new Y.Doc(),
      name: "example-document",
      url,
    });

    this.provider.on("awarenessChange", this.handleAwarenessChange.bind(this));

    this.stickyNoteEntityCollection = new Map();
    this.cursorEntityCollection = new Map();

    this.cursorColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    this.stickyNoteCollection = this.provider.document.getMap<StickyNote>("stickyNotes");
    this.stickyNoteCollection.observe((event) => {
      const isLocalEvent = event.transaction.origin === null;
      if (isLocalEvent) {
        return;
      }

      event.changes.keys.forEach((change, key) => {
        if (change.action === "add") {
          this.createStickyNoteEntity(key as Id);
        } else if (change.action === "update") {
          this.updateStickyNoteEntity(key as Id);
        } else {
          this.deleteStickyNoteEntity(key as Id);
        }
      });
    });
  }

  dispose() {
    this.provider.off("awarenessChange");
    this.provider.destroy();
  }

  addStickyNote(stickyNote: CollaborativeEntity<StickyNote>) {
    this.stickyNoteCollection.set(stickyNote.id(), stickyNote.collaborativeData());
    this.stickyNoteEntityCollection.set(stickyNote.id(), stickyNote);
  }

  updateStickyNote(id: Id, data: StickyNote) {
    this.stickyNoteCollection.set(id, data);
  }

  deleteStickyNote(id: Id) {
    const stickyNoteEntity = this.stickyNoteEntityCollection.get(id);
    if (!stickyNoteEntity) {
      throw new Error("Sticky note not found");
    }
    stickyNoteEntity.dispose();

    this.stickyNoteEntityCollection.delete(id);
    this.stickyNoteCollection.delete(id);
  }

  updateCursorPosition(x: number, y: number) {
    this.provider.setAwarenessField("cursor", {
      color: this.cursorColor,
      x,
      y,
    });
  }

  private createStickyNoteEntity(id: Id) {
    const data = this.stickyNoteCollection.get(id) as StickyNote;

    const stickyNote = this.stickyNoteFactory.create({
      data,
      id,
      session: this,
    });

    this.stickyNoteEntityCollection.set(stickyNote.id(), stickyNote);
  }

  private updateStickyNoteEntity(id: Id) {
    const stickyNote = this.stickyNoteEntityCollection.get(id);
    if (!stickyNote) {
      throw new Error("Sticky note not found");
    }

    const updatedData = this.stickyNoteCollection.get(id) as StickyNote;
    stickyNote.updateFromCollaborativeData(updatedData);
  }

  private deleteStickyNoteEntity(id: Id) {
    const stickyNoteEntity = this.stickyNoteEntityCollection.get(id);
    if (!stickyNoteEntity) {
      throw new Error("Sticky note not found");
    }
    stickyNoteEntity.dispose();

    this.stickyNoteEntityCollection.delete(id);
    this.stickyNoteCollection.delete(id);
  }

  private createOrUpdateClientCursor(clientId: number, data: Cursor) {
    const alreadyExistingCursor = this.cursorEntityCollection.get(clientId);
    if (alreadyExistingCursor) {
      alreadyExistingCursor.updateFromCollaborativeData(data);

      return;
    }

    const cursor = this.cursorFactory.create(data);
    this.cursorEntityCollection.set(clientId, cursor);
  }

  private handleAwarenessChange(data: onAwarenessChangeParameters) {
    if (!this.provider.awareness) {
      throw new Error("Awareness is not defined");
    }

    const localClientId = this.provider.awareness.clientID;

    if (data.states.length - 1 < this.cursorEntityCollection.size) {
      // Someone has left the room, remove their cursor
      this.cursorEntityCollection.forEach((cursor, clientId) => {
        if (data.states.every((state) => state.clientId !== clientId)) {
          cursor.dispose();
          this.cursorEntityCollection.delete(clientId);
        }
      });
    }

    data.states.forEach((state) => {
      if (state.clientId === localClientId) {
        return;
      }

      const cursorCollaborativeData = state.cursor as Cursor;
      this.createOrUpdateClientCursor(state.clientId, cursorCollaborativeData);
    });
  }
}
