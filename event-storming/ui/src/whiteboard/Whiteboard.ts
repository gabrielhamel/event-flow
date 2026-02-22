import { Canvas } from "fabric";
import { setupDottedBackgroundForCanvas } from "./features/background.ts";
import { setupPanningForCanvas } from "./features/pan.ts";
import { setupZoomingForCanvas } from "./features/zoom.ts";
import { StickyNote } from "./StickyNote.ts";

export class Whiteboard {
  private readonly canvas: Canvas;

  constructor(anchor: HTMLCanvasElement, width: number, height: number) {
    this.canvas = new Canvas(anchor, {
      enableRetinaScaling: true,
      width,
      height,
      selection: false,
    });

    setupPanningForCanvas(this.canvas);
    setupDottedBackgroundForCanvas(this.canvas);
    setupZoomingForCanvas(this.canvas);

    this.canvas.requestRenderAll();
  }

  destroy() {
    void this.canvas.dispose();
  }

  resize(width: number, height: number) {
    this.canvas.setDimensions({
      width,
      height,
    });
  }

  addStickyNote(color: string) {
    const stickyNote = new StickyNote(color);

    stickyNote.attach(this.canvas);
  }
}
