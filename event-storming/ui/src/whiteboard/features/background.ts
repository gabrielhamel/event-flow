import type { Canvas } from "fabric";

interface ViewportState {
  zoom: number;
  scrollX: number;
  scrollY: number;
}

const BASE_DOT_SPACING = 20;
const BASE_DOT_SIZE = 1.5;
const DOT_COLOR = "#d0d0d0";
const BACKGROUND_COLOR = "#FFFFFF";

const renderDottedBackground = (
  ctx: CanvasRenderingContext2D,
  { zoom, scrollX, scrollY }: ViewportState,
) => {
  const canvas = ctx.canvas;
  ctx.fillStyle = BACKGROUND_COLOR;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const dotSpacing = BASE_DOT_SPACING * zoom;
  const dotSize = Math.max(1, BASE_DOT_SIZE * zoom);
  const offsetX = ((scrollX * zoom) % dotSpacing + dotSpacing) % dotSpacing;
  const offsetY = ((scrollY * zoom) % dotSpacing + dotSpacing) % dotSpacing;

  ctx.fillStyle = DOT_COLOR;

  for (let x = offsetX; x < canvas.width; x += dotSpacing) {
    for (let y = offsetY; y < canvas.height; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

export const setupDottedBackgroundForCanvas = (canvas: Canvas) => {
  canvas.on("before:render", () => {
    const ctx = canvas.getContext();
    const vpt = canvas.viewportTransform;
    const zoom = canvas.getZoom();

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    renderDottedBackground(ctx, {
      zoom,
      scrollX: 2 * vpt[4] / zoom,
      scrollY: 2 * vpt[5] / zoom,
    });

    ctx.restore();
  });
};
