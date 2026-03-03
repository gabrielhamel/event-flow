export interface Whiteboard {
  resize: (width: number, height: number) => void;
  createStickyNote: (color: string) => void;
  dispose: () => Promise<void>;
}
