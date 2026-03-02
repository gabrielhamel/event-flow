import type { Canvas } from "fabric";

const renderDottedBackground = (
  ctx: CanvasRenderingContext2D,
  { zoom, scrollX, scrollY }: {
    zoom: number;
    scrollX: number;
    scrollY: number;
  },
) => {
  const { canvas } = ctx;

  ctx.fillStyle = "#FFFFFF";
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  const dotSpacing = 20 * zoom;
  const dotSize = Math.max(1, 1.5 * zoom);
  const offsetX = ((scrollX * zoom) % dotSpacing + dotSpacing) % dotSpacing;
  const offsetY = ((scrollY * zoom) % dotSpacing + dotSpacing) % dotSpacing;

  ctx.fillStyle = "#d0d0d0";

  for (let x = offsetX; x < canvas.width; x += dotSpacing) {
    for (let y = offsetY; y < canvas.height; y += dotSpacing) {
      ctx.beginPath();
      ctx.arc(x, y, dotSize, 0, Math.PI * 2);
      ctx.fill();
    }
  }
};

export const addDottedBackgroundModule = (canvas: Canvas) => {
  canvas.on("before:render", () => {
    const ctx = canvas.getContext();
    const vpt = canvas.viewportTransform;
    const zoom = canvas.getZoom();

    ctx.save();
    ctx.setTransform(1, 0, 0, 1, 0, 0);

    renderDottedBackground(ctx, {
      scrollX: 2 * vpt[4] / zoom,
      scrollY: 2 * vpt[5] / zoom,
      zoom,
    });

    ctx.restore();
  });
};
