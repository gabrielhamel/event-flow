import { HocuspocusProvider } from "@hocuspocus/provider";
import type { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { StickyNoteCollaborativeData } from "@repo/core/StickyNoteCollaborativeData";
import * as Y from "yjs";

interface CollaborativeWhiteboardHandlers {
  createStickyNote: (id: string, data: StickyNoteCollaborativeData) => CollaborativeEntity<StickyNoteCollaborativeData>;
}

export class CollaborativeWhiteboardSession {
  private readonly provider: HocuspocusProvider;
  private readonly stickyNoteCollection: Y.Map<StickyNoteCollaborativeData>;
  private readonly stickyNoteEntityCollection: Map<string, CollaborativeEntity<StickyNoteCollaborativeData>>;

  constructor(url: string, handlers: CollaborativeWhiteboardHandlers) {
    this.provider = new HocuspocusProvider({
      document: new Y.Doc(),
      name: "example-document",
      url,
    });

    this.stickyNoteEntityCollection = new Map();
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
          const stickyNote = handlers.createStickyNote(key, data);
          this.stickyNoteEntityCollection.set(stickyNote.id(), stickyNote);

          console.log("add sticky note");
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
}
