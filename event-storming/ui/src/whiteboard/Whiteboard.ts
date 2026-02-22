import { Canvas } from "fabric";
import { renderDottedBackground } from "./background.ts";
import { setupPanningForCanvas } from "./pan.ts";
import { StickyNote } from "./StickyNote.ts";
import { setupZoomingForCanvas } from "./zoom.ts";

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

    this.canvas.on("before:render", () => {
      const ctx = this.canvas.getContext();
      const vpt = this.canvas.viewportTransform;
      const zoom = this.canvas.getZoom();
      ctx.save();
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      renderDottedBackground(ctx, {
        zoom,
        scrollX: 2 * vpt[4] / zoom,
        scrollY: 2 * vpt[5] / zoom,
      });
      ctx.restore();
    });
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
