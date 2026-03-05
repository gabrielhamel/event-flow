import { HocuspocusProvider, type onAwarenessChangeParameters } from "@hocuspocus/provider";
import type { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { CursorCollaborativeData } from "@repo/core/collaborative/CursorCollaborativeData";
import type { StickyNoteCollaborativeData } from "@repo/core/collaborative/StickyNoteCollaborativeData";
import * as Y from "yjs";

export interface StickyNoteFactory {
  create: (
    id: string,
    data: StickyNoteCollaborativeData,
    session: CollaborativeWhiteboardSession,
  ) => CollaborativeEntity<StickyNoteCollaborativeData>;
}

export interface CursorFactory {
  create: (data: CursorCollaborativeData) => CollaborativeEntity<CursorCollaborativeData>;
}

export class CollaborativeWhiteboardSession {
  private readonly provider: HocuspocusProvider;
  private readonly stickyNoteFactory: StickyNoteFactory;
  private readonly cursorFactory: CursorFactory;
  private readonly stickyNoteCollection: Y.Map<StickyNoteCollaborativeData>;
  private readonly stickyNoteEntityCollection: Map<string, CollaborativeEntity<StickyNoteCollaborativeData>>;
  private readonly cursorEntityCollection: Map<number, CollaborativeEntity<CursorCollaborativeData>>;
  private readonly cursorColor: string;

  constructor(
    url: string,
    stickyNoteFactory: StickyNoteFactory,
    cursorFactory: CursorFactory,
  ) {
    this.stickyNoteFactory = stickyNoteFactory;
    this.cursorFactory = cursorFactory;

    this.provider = new HocuspocusProvider({
      document: new Y.Doc(),
      name: "example-document",
      onAwarenessChange: this.handleAwarenessChange.bind(this),
      url,
    });

    this.stickyNoteEntityCollection = new Map();
    this.cursorEntityCollection = new Map();

    this.cursorColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

    this.stickyNoteCollection = this.provider.document.getMap<StickyNoteCollaborativeData>(
      "stickyNotes",
    );
    this.stickyNoteCollection.observe((event) => {
      const isLocalEvent = event.transaction.origin === null;
      if (isLocalEvent) {
        return;
      }

      event.changes.keys.forEach((change, key) => {
        if (change.action === "add") {
          this.createStickyNoteEntity(key);
        } else if (change.action === "update") {
          this.updateStickyNoteEntity(key);
        }
      });
    });
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

  private createStickyNoteEntity(id: string) {
    const data = this.stickyNoteCollection.get(id) as StickyNoteCollaborativeData;
    const stickyNote = this.stickyNoteFactory.create(id, data, this);
    this.stickyNoteEntityCollection.set(stickyNote.id(), stickyNote);
  }

  private updateStickyNoteEntity(id: string) {
    const stickyNote = this.stickyNoteEntityCollection.get(id);
    if (!stickyNote) {
      throw new Error("Sticky note not found");
    }

    const newData = this.stickyNoteCollection.get(id) as StickyNoteCollaborativeData;
    stickyNote.updateFromCollaborativeData(newData);
  }

  private createOrUpdateClientCursor(clientId: number, data: CursorCollaborativeData) {
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

    data.states.forEach((state) => {
      if (state.clientId === localClientId) {
        return;
      }

      const cursorCollaborativeData = state.cursor as CursorCollaborativeData;
      this.createOrUpdateClientCursor(state.clientId, cursorCollaborativeData);
    });
  }
}
