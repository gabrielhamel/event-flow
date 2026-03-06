import type { Canvas, TPointerEventInfo } from "fabric";

export const listenCanvasPan = (canvas: Canvas, onCanvasPan: (deltaX: number, deltaY: number) => void) => {
  const handleMouseWheel = ({ e: event }: TPointerEventInfo<WheelEvent>) => {
    event.preventDefault();
    event.stopPropagation();

    if (!event.ctrlKey) {
      onCanvasPan(event.deltaX, event.deltaY);
    }
  };

  canvas.on("mouse:wheel", handleMouseWheel);
};

export const addPanningModule = (canvas: Canvas) => {
  const moveViewport = (deltaX: number, deltaY: number) => {
    const transform = canvas.viewportTransform;
    transform[4] -= deltaX * 1.7;
    transform[5] -= deltaY * 1.7;

    canvas.requestRenderAll();
  };

  listenCanvasPan(canvas, moveViewport);
};
