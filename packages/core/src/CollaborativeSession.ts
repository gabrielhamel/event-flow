import type { CollaborativeEntity } from "@repo/core/CollaborativeEntity";
import type { StickyNoteCollaborativeData } from "@repo/core/StickyNoteCollaborativeData";
import type { Doc } from "yjs";

const STICKY_NOTE_COLLECTION = "stickyNotes";

export class CollaborativeSession {
  private readonly document: Doc;

  constructor(document: Doc) {
    this.document = document;
  }

  addStickyNote(stickyNote: CollaborativeEntity<StickyNoteCollaborativeData>) {
    const stickyNotes = this.document.getMap<StickyNoteCollaborativeData>(STICKY_NOTE_COLLECTION);

    stickyNotes.set(stickyNote.id(), stickyNote.collaborativeData());
  }
}
