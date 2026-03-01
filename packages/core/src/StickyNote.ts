export interface StickyNoteDocumentObject {
  id: string;
  color: string;
  text: string;
  x: number;
  y: number;
}

export interface StickyNote {
  id: () => string;
  toDocumentObject: () => StickyNoteDocumentObject;
  updateFromDocumentObject: (object: StickyNoteDocumentObject) => void;
}
