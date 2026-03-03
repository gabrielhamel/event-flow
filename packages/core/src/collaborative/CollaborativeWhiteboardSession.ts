import { HocuspocusProvider } from "@hocuspocus/provider";
import type { CollaborativeEntity } from "@repo/core/collaborative/CollaborativeEntity";
import type { StickyNoteCollaborativeData } from "@repo/core/StickyNoteCollaborativeData";
import * as Y from "yjs";

interface CollaborativeWhiteboardHandlers {
  onStickyNoteAdded: (data: StickyNoteCollaborativeData) => void;
}

export class CollaborativeWhiteboardSession {
  private readonly provider: HocuspocusProvider;
  private readonly stickyNoteCollection;

  constructor(url: string, handlers: CollaborativeWhiteboardHandlers) {
    this.provider = new HocuspocusProvider({
      document: new Y.Doc(),
      name: "example-document",
      url,
    });

    this.stickyNoteCollection = this.provider.document.getArray<{ id: string } & StickyNoteCollaborativeData>(
      "stickyNotes",
    );

    this.stickyNoteCollection.observe((event) => {
      if (event.transaction.origin === null) {
        return;
      }

      event.changes.added.forEach((item) => {
        const data = item.content.getContent().at(0) as StickyNoteCollaborativeData;

        handlers.onStickyNoteAdded(data);
      });
    });
  }

  dispose() {
    this.provider.destroy();
  }

  addStickyNote(stickyNote: CollaborativeEntity<StickyNoteCollaborativeData>) {
    this.stickyNoteCollection.push([{ id: stickyNote.id(), ...stickyNote.collaborativeData() }]);
  }

  updateStickyNote(id: string, data: StickyNoteCollaborativeData) {
    void id;
    void data;
  }
}
